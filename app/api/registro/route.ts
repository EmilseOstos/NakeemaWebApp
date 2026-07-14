import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { hashPassword } from '@/lib/password';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function POST(request: Request) {
  try {
    const { nombre, email, password } = await request.json();

    if (!nombre || !email || !password) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
    }

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { message: 'Modo local: Usuario registrado simulado', data: { nombre, email } },
        { status: 200 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('nombre', 'Cliente')
      .single();

    if (roleError || !roleData) {
      console.error('Error buscando rol Cliente:', roleError);
      return NextResponse.json({ error: 'Error interno de roles en la base de datos' }, { status: 500 });
    }

    const password_hash = await hashPassword(password);

    const { data: usuarioData, error: usuarioError } = await supabase
      .from('usuarios')
      .insert([
        {
          username: email,
          email,
          password_hash,
          rol_id: roleData.id
        }
      ])
      .select()
      .single();

    if (usuarioError) {
      console.error('Error insertando usuario:', usuarioError);
      if (usuarioError.code === '23505') {
        return NextResponse.json({ error: 'El correo electrónico ya está registrado.' }, { status: 400 });
      }
      return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 });
    }

    const { error: clienteError } = await supabase
      .from('clientes')
      .insert([
        {
          usuario_id: usuarioData.id,
          nombre,
        }
      ]);

    if (clienteError) {
      console.error('Error insertando cliente:', clienteError);
      return NextResponse.json({ error: 'Error creando perfil de cliente' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Usuario registrado exitosamente' }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error en POST /api/registro:', message);
    return NextResponse.json({ error: 'Error interno del servidor', details: message }, { status: 500 });
  }
}
