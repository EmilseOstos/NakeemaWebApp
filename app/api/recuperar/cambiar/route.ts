import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { verifyRecoveryToken } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'El token y la nueva contraseña son obligatorios.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres.' }, { status: 400 });
    }

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Modo local: no se puede cambiar la contraseña sin conexión a Supabase.' }, { status: 400 });
    }

    const email = await verifyRecoveryToken(token);
    if (!email) {
      return NextResponse.json({ error: 'El enlace de recuperación es inválido o expiró. Solicita uno nuevo.' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const password_hash = await bcrypt.hash(password, 10);

    const { error } = await supabase
      .from('usuarios')
      .update({ password_hash })
      .eq('email', email);

    if (error) throw error;

    return NextResponse.json({ message: 'Contraseña actualizada exitosamente. Ya puedes iniciar sesión.' }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error en POST /api/recuperar/cambiar:', message);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
