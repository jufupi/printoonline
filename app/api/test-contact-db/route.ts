import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          error: 'Missing Supabase configuration',
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseServiceKey
        },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Test 1: Check table structure
    const { data: columns, error: columnsError } = await supabase
      .from('contact_submissions')
      .select('*')
      .limit(0);

    if (columnsError) {
      return NextResponse.json({
        test: 'table_structure',
        error: columnsError.message,
        code: columnsError.code,
        details: columnsError.details
      }, { status: 500 });
    }

    // Test 2: Try to insert a test record
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'general',
      message: 'This is a test message',
      ip_address: '127.0.0.1',
      email_sent: false,
      email_error: null,
      submitted_at: new Date().toISOString(),
    };

    const { data: insertData, error: insertError } = await supabase
      .from('contact_submissions')
      .insert(testData)
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({
        test: 'insert',
        error: insertError.message,
        code: insertError.code,
        details: insertError.details,
        hint: insertError.hint,
        testData
      }, { status: 500 });
    }

    // Test 3: Delete the test record
    await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', insertData.id);

    return NextResponse.json({
      success: true,
      message: 'All tests passed',
      insertedId: insertData.id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json(
      {
        error: 'Unexpected error',
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
