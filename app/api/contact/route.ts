import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const RATE_LIMIT_MINUTES = 1;

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase configuration');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

async function checkRateLimit(email: string, ip: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  const cutoffTime = new Date(Date.now() - RATE_LIMIT_MINUTES * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('contact_submissions')
    .select('id')
    .eq('email', email)
    .gte('submitted_at', cutoffTime)
    .maybeSingle();

  if (error) {
    console.error('[RATE LIMIT] Error checking rate limit:', {
      error: error.message,
      code: error.code,
      details: error.details,
      email,
      ip
    });
    // Si hay error al consultar, permitir el envío (mejor experiencia de usuario)
    return true;
  }

  const isAllowed = data === null;
  console.log('[RATE LIMIT] Check result:', {
    email,
    ip,
    isAllowed,
    hasRecentSubmission: !isAllowed,
    cutoffTime
  });

  return isAllowed;
}

async function saveSubmission(
  formData: ContactFormData,
  ip: string,
  emailSent: boolean,
  emailError?: string
): Promise<string | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      ip_address: ip,
      email_sent: emailSent,
      email_error: emailError || null,
      submitted_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('[SAVE SUBMISSION] Failed to save submission:', {
      error: error.message,
      code: error.code,
      details: error.details,
      email: formData.email,
      ip
    });
    return null;
  }

  console.log('[SAVE SUBMISSION] Successfully saved submission:', {
    id: data.id,
    email: formData.email,
    subject: formData.subject,
    ip,
    emailSent,
    timestamp: data.submitted_at
  });

  return data.id;
}

async function sendEmailViaMailChannels(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  const subjectLabels: Record<string, string> = {
    general: 'Consulta general',
    partnership: 'Oportunidad de colaboración',
    support: 'Soporte técnico',
    feedback: 'Opinión o sugerencia',
    other: 'Otro',
  };

  const subjectLabel = subjectLabels[data.subject] || data.subject;

  const emailBody = {
    personalizations: [
      {
        to: [{ email: 'contacto@printoonline.com' }],
      },
    ],
    from: {
      email: 'no-reply@printoonline.com',
      name: 'PrintOOnline',
    },
    subject: `Nuevo mensaje desde el formulario: ${subjectLabel}`,
    content: [
      {
        type: 'text/html',
        value: `
          <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                  Nuevo mensaje desde el formulario de contacto
                </h2>

                <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 10px 0;"><strong>Nombre:</strong> ${data.name}</p>
                  <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email}</p>
                  <p style="margin: 10px 0;"><strong>Asunto:</strong> ${subjectLabel}</p>
                </div>

                <div style="margin: 20px 0;">
                  <h3 style="color: #1e293b;">Mensaje:</h3>
                  <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 15px; border-radius: 8px;">${data.message}</p>
                </div>

                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />

                <p style="font-size: 12px; color: #64748b; text-align: center;">
                  Este mensaje fue enviado desde el formulario de contacto de PrintOOnline.com
                </p>
              </div>
            </body>
          </html>
        `,
      },
    ],
  };

  try {
    const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[EMAIL] MailChannels error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      return {
        success: false,
        error: `MailChannels error: ${response.status} ${errorText}`
      };
    }

    console.log('[EMAIL] MailChannels success:', response.status);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[EMAIL] Error sending email:', errorMessage);
    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const clientIp = getClientIp(request);

    console.log('[CONTACT FORM] New submission received:', {
      email: body.email,
      subject: body.subject,
      ip: clientIp,
      timestamp: new Date().toISOString()
    });

    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    if (body.name.length > 100 || body.message.length > 2000) {
      return NextResponse.json(
        { error: 'Los campos exceden la longitud máxima permitida' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email no válido' },
        { status: 400 }
      );
    }

    const canSubmit = await checkRateLimit(body.email, clientIp);
    if (!canSubmit) {
      console.error('[RATE LIMIT BLOCKED] Request denied:', {
        email: body.email,
        ip: clientIp,
        rateLimitMinutes: RATE_LIMIT_MINUTES,
        timestamp: new Date().toISOString()
      });
      return NextResponse.json(
        {
          error: `Por favor, espera ${RATE_LIMIT_MINUTES} minuto antes de enviar otro mensaje`
        },
        { status: 429 }
      );
    }

    // Intentar enviar el email (pero no bloquear si falla)
    const emailResult = await sendEmailViaMailChannels(body);

    if (emailResult.success) {
      console.log('[EMAIL] Successfully sent email via MailChannels:', {
        email: body.email,
        subject: body.subject
      });
    } else {
      console.warn('[EMAIL] Failed to send email, but will save message anyway:', {
        email: body.email,
        subject: body.subject,
        error: emailResult.error
      });
    }

    // Guardar el mensaje completo en la base de datos
    const submissionId = await saveSubmission(
      body,
      clientIp,
      emailResult.success,
      emailResult.error
    );

    if (!submissionId) {
      console.error('[CONTACT FORM] Failed to save submission to database');
      return NextResponse.json(
        { error: 'Error al guardar tu mensaje. Por favor, inténtalo de nuevo más tarde.' },
        { status: 500 }
      );
    }

    console.log('[CONTACT FORM] Request completed successfully:', {
      submissionId,
      emailSent: emailResult.success
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Mensaje recibido correctamente. Te responderemos pronto.',
        submissionId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Error al procesar tu solicitud' },
      { status: 500 }
    );
  }
}
