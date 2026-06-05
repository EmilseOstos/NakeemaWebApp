import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

    // 1. Buscar el ID del rol "Cliente"
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('nombre', 'Cliente')
      .single();

    if (roleError || !roleData) {
      console.error('Error buscando rol Cliente:', roleError);
      return NextResponse.json({ error: 'Error interno de roles en la base de datos' }, { status: 500 });
    }

    // 2. Insertar en tabla usuarios
    // Nota: en un ambiente real se debe aplicar hash a la contraseña. Para este demo/MVP la guardamos como texto o hash simple si se requiere.
    const { data: usuarioData, error: usuarioError } = await supabase
      .from('usuarios')
      .insert([
        {
          username: email, // Usamos email como username
          email,
          password_hash: password, // <-- AQUÍ DEBERÍA IR UN HASH (bcrypt). Por ahora se guarda directo para compatibilidad MVP
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

    // 3. Insertar en tabla clientes usando el ID del usuario
    const { error: clienteError } = await supabase
      .from('clientes')
      .insert([
        {
          usuario_id: usuarioData.id,
          nombre,
          // campos adicionales quedan nulos/default
        }
      ]);

    if (clienteError) {
      console.error('Error insertando cliente:', clienteError);
      // Opcional: borrar el usuario creado si falla el cliente (rollback manual), pero por ahora solo retornamos error.
      return NextResponse.json({ error: 'Error creando perfil de cliente' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Usuario registrado exitosamente' }, { status: 200 });

  } catch (err: any) {
    console.error('Error en POST /api/registro:', err);
    return NextResponse.json({ error: 'Error interno del servidor', details: err.message }, { status: 500 });
  }
}
