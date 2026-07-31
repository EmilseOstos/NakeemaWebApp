import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createRecoveryToken } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'El correo electrónico es obligatorio.' }, { status: 400 });
    }

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { message: 'El sistema está en modo local sin base de datos conectada. La recuperación de contraseña requiere la conexión a Supabase.' },
        { status: 200 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: usuario } = await supabase
      .from('usuarios')
      .select('id, email')
      .eq('email', email)
      .single();

    if (!usuario) {
      return NextResponse.json(
        { message: 'Si el correo está registrado, recibirás instrucciones para recuperar tu contraseña.' },
        { status: 200 }
      );
    }

    const token = await createRecoveryToken(usuario.email);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resetUrl = `${appUrl}/recuperar/confirmar?token=${encodeURIComponent(token)}`;

    const resendKey = process.env.RESEND_API_KEY;
    const mailFrom = process.env.MAIL_FROM || 'NAKEEMAF <onboarding@resend.dev>';

    if (!resendKey) {
      console.log(`[recuperar] Correo no configurado (sin RESEND_API_KEY). Enlace para ${usuario.email}: ${resetUrl}`);
      return NextResponse.json(
        {
          message: 'Tu solicitud fue registrada. El envío de correo no está configurado en este entorno: contacta al administrador del sistema.',
          hint: process.env.NODE_ENV === 'development' ? resetUrl : undefined,
        },
        { status: 200 }
      );
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: mailFrom,
        to: usuario.email,
        subject: 'Recuperación de contraseña - NAKEEMAF',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 16px;">
            <h2 style="color: #0da766; margin-bottom: 16px;">Recupera tu contraseña</h2>
            <p style="color: #374151; line-height: 1.6;">Hola, recibimos una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón para continuar:</p>
            <a href="${resetUrl}" style="display: inline-block; background: #0da766; color: #ffffff; font-weight: bold; padding: 12px 24px; border-radius: 9999px; text-decoration: none; margin: 16px 0;">Restablecer contraseña</a>
            <p style="color: #6b7280; font-size: 13px;">El enlace es válido por 1 hora. Si no solicitaste este cambio, ignora este correo.</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      console.error('Error enviando correo de recuperación:', res.status, await res.text());
      return NextResponse.json(
        { message: 'Tu solicitud fue registrada, pero no se pudo enviar el correo. Contacta al administrador del sistema.' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Si el correo está registrado, recibirás instrucciones para recuperar tu contraseña.' },
      { status: 200 }
    );

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error en POST /api/recuperar:', message);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
