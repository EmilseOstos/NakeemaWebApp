import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifySessionToken } from '@/lib/session';
import { cookies } from 'next/headers';

const normalizar = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const user = await verifySessionToken(sessionCookie);
    if (!user) {
      return NextResponse.json({ error: 'Sesión inválida' }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ data: { nombre: 'Usuario Local', email: user.email }, rol: user.rol }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    let profile = null;

    if (normalizar(user.rol) === 'cliente') {
      const { data } = await supabase
        .from('clientes')
        .select('*')
        .eq('usuario_id', user.id)
        .single();
      profile = data ? { ...data, email: user.email } : { email: user.email };
    } else if (normalizar(user.rol) === 'tecnico') {
      const { data } = await supabase
        .from('tecnicos')
        .select('*')
        .eq('usuario_id', user.id)
        .single();
      profile = data ? { ...data, email: user.email } : { email: user.email };
    } else if (normalizar(user.rol) === 'administrador') {
      const { data } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', user.id)
        .single();
      profile = data ? { ...data, email: user.email } : { email: user.email };
    }

    return NextResponse.json({ data: profile, rol: user.rol }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error GET /api/perfil:', message);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const user = await verifySessionToken(sessionCookie);
    if (!user) {
      return NextResponse.json({ error: 'Sesión inválida' }, { status: 401 });
    }

    const body = await request.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ message: 'Perfil actualizado (Modo Local)' }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (normalizar(user.rol) === 'cliente') {
      const updates: Record<string, unknown> = {};
      if (body.nombre !== undefined) updates.nombre = body.nombre;
      if (body.telefono !== undefined) updates.telefono = body.telefono;
      if (body.direccion !== undefined) updates.direccion = body.direccion;

      const { error } = await supabase
        .from('clientes')
        .update(updates)
        .eq('usuario_id', user.id);

      if (error) throw error;
    } else if (normalizar(user.rol) === 'tecnico') {
      const updates: Record<string, unknown> = {};
      if (body.nombre !== undefined) updates.nombre = body.nombre;
      if (body.telefono !== undefined) updates.telefono = body.telefono;
      if (body.especialidad !== undefined) updates.especialidad = body.especialidad;

      const { error } = await supabase
        .from('tecnicos')
        .update(updates)
        .eq('usuario_id', user.id);

      if (error) throw error;
    }

    return NextResponse.json({ message: 'Perfil actualizado exitosamente' }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error PUT /api/perfil:', message);
    return NextResponse.json({ error: 'Error al actualizar perfil' }, { status: 500 });
  }
}
