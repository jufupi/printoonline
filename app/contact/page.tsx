'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, MessageSquare, Building2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);

  useEffect(() => {
    const savedCooldown = localStorage.getItem('contactCooldown');
    if (savedCooldown) {
      const cooldownTime = parseInt(savedCooldown, 10);
      if (Date.now() < cooldownTime) {
        setCooldownUntil(cooldownTime);
      } else {
        localStorage.removeItem('contactCooldown');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      const cooldownEnd = Date.now() + 1 * 60 * 1000;
      setCooldownUntil(cooldownEnd);
      localStorage.setItem('contactCooldown', cooldownEnd.toString());

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el mensaje');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const subjects = [
    { value: 'general', label: 'Consulta general' },
    { value: 'partnership', label: 'Oportunidad de colaboración' },
    { value: 'support', label: 'Soporte técnico' },
    { value: 'feedback', label: 'Opinión o sugerencia' },
    { value: 'other', label: 'Otro' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Ponte en contacto
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o quieres colaborar con nosotros? Nos encantaría saber
            de ti.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                <MessageSquare className="h-6 w-6 text-slate-700" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Consultas generales
              </h3>
              <p className="text-sm text-slate-600">
                Preguntas sobre cómo funciona PrintOOnline o cómo usar nuestra
                plataforma
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                <Building2 className="h-6 w-6 text-slate-700" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Para servicios de impresión
              </h3>
              <p className="text-sm text-slate-600">
                ¿Te interesa convertirte en socio? Hablemos sobre cómo podemos
                trabajar juntos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                <Mail className="h-6 w-6 text-slate-700" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Opiniones
              </h3>
              <p className="text-sm text-slate-600">
                Comparte tu experiencia o sugiere mejoras para nuestra plataforma
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Envíanos un mensaje</CardTitle>
          </CardHeader>
          <CardContent>
            {submitted && (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  ¡Gracias por tu mensaje! Te responderemos lo antes
                  posible.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="mb-6 bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) =>
                    setFormData({ ...formData, subject: value })
                  }
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Selecciona un asunto" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="Dinos cómo podemos ayudarte..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={
                  !formData.name ||
                  !formData.email ||
                  !formData.subject ||
                  !formData.message ||
                  isLoading ||
                  (cooldownUntil !== null && Date.now() < cooldownUntil)
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-5 w-5" />
                    Enviar mensaje
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-600 text-center">
                Normalmente respondemos en 24-48 horas durante los días laborables.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">¿Buscas algo específico?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <a href="/how-it-works">Descubre cómo funciona</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/for-printers">Colabora con nosotros</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/about">Acerca de PrintOOnline</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
