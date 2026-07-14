import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { comparePassword } from '@/lib/password';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    const body = await request.json();
    const { email, password, rol } = body;

    if (!email || !password || !rol) {
      return NextResponse.json(
        { error: 'El email, contraseña y rol son obligatorios.' },
        { status: 400 }
      );
    }

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'No hay conexión a la base de datos. Verifica las credenciales de Supabase.' },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('*, roles!inner(nombre)')
      .eq('email', email)
      .single();

    if (error || !usuario) {
      return NextResponse.json({ error: 'Credenciales incorrectas o usuario no encontrado.' }, { status: 401 });
    }

    const passwordValida = await comparePassword(password, usuario.password_hash);
    if (!passwordValida) {
      return NextResponse.json({ error: 'Credenciales incorrectas o usuario no encontrado.' }, { status: 401 });
    }

type RoleRow = { nombre: string };
    const rolesData = usuario.roles as RoleRow;
    const rolUsuario = rolesData.nombre;
    if (rolUsuario !== rol) {
      return NextResponse.json({ error: `El rol seleccionado no coincide con el usuario.` }, { status: 403 });
    }

    const safeUser = {
      id: usuario.id,
      email: usuario.email,
      username: usuario.username,
    };
    return NextResponse.json({
      message: 'Autenticación exitosa',
      user: { ...safeUser, rol: rolUsuario }
    }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error en el endpoint de autenticación:', message);
    return NextResponse.json(
      { error: 'Error interno del servidor.', details: message },
      { status: 500 }
    );
  }
}
