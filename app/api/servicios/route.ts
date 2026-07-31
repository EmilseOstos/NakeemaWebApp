import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ data: [], message: 'Modo local sin conexión a Supabase' }, { status: 200 });
    }

    const { searchParams } = new URL(request.url);
    const clienteId = searchParams.get('cliente_id');
    const tecnicoId = searchParams.get('tecnico_id');

    const supabase = createClient(supabaseUrl, supabaseKey);

    let query = supabase
      .from('servicios')
      .select(`
        id,
        descripcion,
        estado,
        fecha_creacion,
        fecha_completado,
        cliente_id,
        clientes ( nombre ),
        tecnicos ( nombre )
      `);

    if (clienteId) query = query.eq('cliente_id', clienteId);
    if (tecnicoId) query = query.eq('tecnico_id', tecnicoId);

    const { data, error } = await query.order('fecha_creacion', { ascending: false });

    if (error) throw error;

    const servicios = data.map((s: Record<string, unknown>) => ({
      id: s.id,
      descripcion: s.descripcion,
      estado: s.estado,
      fecha_creacion: s.fecha_creacion,
      cliente_id: s.cliente_id,
      cliente_nombre: (s.clientes as { nombre?: string } | null)?.nombre || 'Sin cliente',
      tecnico_nombre: (s.tecnicos as { nombre?: string } | null)?.nombre || 'Sin asignar',
    }));

    return NextResponse.json({ data: servicios }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error GET /api/servicios:', message);
    return NextResponse.json({ error: 'Error al obtener servicios.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    const body = await request.json();
    const { titulo, categoria, prioridad, direccion, descripcion } = body;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { message: 'Servicio registrado (Modo Local - Sin Supabase)' },
        { status: 200 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: clientes, error: clienteError } = await supabase
      .from('clientes')
      .select('id')
      .limit(1);

    if (clienteError || !clientes || clientes.length === 0) {
      return NextResponse.json(
        { error: 'No se encontraron clientes en la base de datos para asignar el servicio.' },
        { status: 400 }
      );
    }

    const cliente_id = clientes[0].id;
    const descripcionCompleta = `Título: ${titulo}\nCategoría: ${categoria}\nPrioridad: ${prioridad}\nDirección: ${direccion}\n\nDetalles:\n${descripcion}`;

    const { data, error } = await supabase
      .from('servicios')
      .insert([{ cliente_id, descripcion: descripcionCompleta, estado: 'Pendiente' }]);

    if (error) {
      console.error('Error insertando servicio:', error);
      return NextResponse.json({ error: 'Error al insertar en Supabase' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Servicio creado exitosamente en Supabase', data }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error en el endpoint de servicios:', message);
    return NextResponse.json(
      { error: 'Error interno del servidor.', details: message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    const body = await request.json();
    const { id, estado, tecnico_id } = body;

    if (!id) {
      return NextResponse.json({ error: 'El ID del servicio es obligatorio.' }, { status: 400 });
    }

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ message: 'Estado actualizado (Modo Local)' }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const updates: Record<string, unknown> = {};
    if (estado) updates.estado = estado;
    if (tecnico_id) updates.tecnico_id = tecnico_id;
    if (estado === 'Finalizado' || estado === 'Completado') updates.fecha_completado = new Date().toISOString();

    const { data, error } = await supabase
      .from('servicios')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;

    return NextResponse.json({ message: 'Servicio actualizado', data }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error PATCH /api/servicios:', message);
    return NextResponse.json({ error: 'Error al actualizar servicio.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'El ID del servicio es obligatorio.' }, { status: 400 });
    }

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ message: 'Servicio eliminado (Modo Local)' }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from('servicios').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Servicio eliminado' }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error DELETE /api/servicios:', message);
    return NextResponse.json({ error: 'Error al eliminar servicio.' }, { status: 500 });
  }
}
