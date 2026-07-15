import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ data: [], message: 'Modo local sin conexión' }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('clientes')
      .select('*, usuarios ( email )')
      .order('nombre', { ascending: true });

    if (error) throw error;

    const clientes = data.map((c: Record<string, unknown>) => ({
      id: c.id,
      nombre: c.nombre,
      email: c.usuarios?.email || '',
      telefono: c.telefono,
      direccion: c.direccion,
      estado: c.estado,
    }));

    return NextResponse.json({ data: clientes }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error GET /api/clientes:', message);
    return NextResponse.json({ error: 'Error al obtener clientes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, direccion } = body;

    if (!nombre || !email) {
      return NextResponse.json({ error: 'Nombre y email son obligatorios' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ message: 'Cliente registrado (Modo Local)', data: body }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get Cliente role ID
    const { data: rolData } = await supabase.from('roles').select('id').eq('nombre', 'Cliente').single();
    if (!rolData) {
      return NextResponse.json({ error: 'Rol Cliente no encontrado en la base de datos' }, { status: 500 });
    }

    // Generate a random password for the new client
    const tempPassword = Math.random().toString(36).slice(-10);

    // Create user
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .insert([{
        username: email.split('@')[0],
        email,
        password_hash: tempPassword,
        rol_id: rolData.id,
      }])
      .select()
      .single();

    if (userError) throw new Error(userError.message);

    // Create client record linked to user
    const { data: clienteData, error: clienteError } = await supabase
      .from('clientes')
      .insert([{
        usuario_id: userData.id,
        nombre,
        telefono: telefono || null,
        direccion: direccion || null,
      }])
      .select()
      .single();

    if (clienteError) throw new Error(clienteError.message);

    return NextResponse.json({
      message: 'Cliente creado exitosamente',
      data: { ...clienteData, email, tempPassword },
    }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error POST /api/clientes:', message);
    return NextResponse.json({ error: 'Error al crear cliente', details: message }, { status: 500 });
  }
}
