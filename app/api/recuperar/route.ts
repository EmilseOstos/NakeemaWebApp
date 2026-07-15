import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
        { message: 'Modo local: recuperación simulada' },
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

    console.log(`Solicitud de recuperación para: ${usuario.email} (${usuario.id})`);

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
