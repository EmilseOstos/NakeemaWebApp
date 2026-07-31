import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifySessionToken } from '@/lib/session';
import { cookies } from 'next/headers';

const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  if (!supabaseUrl || !supabaseKey) return null;
  return createClient(supabaseUrl, supabaseKey);
};

type SupabaseClient = NonNullable<ReturnType<typeof getSupabase>>;

// Columnas nuevas (requieren la migración 20260731000000).
const CAMPOS_NUEVOS = [
  'titulo', 'categoria', 'prioridad', 'direccion',
  'reporte_descripcion', 'cantidad', 'costo', 'tiempo', 'notas_tecnicas',
];

let columnasCache: boolean | null = null;

// Detecta si la BD ya tiene las columnas nuevas de la migración.
// PostgREST devuelve error si la columna no existe, así no dependemos de information_schema.
async function tieneCamposNuevos(supabase: SupabaseClient): Promise<boolean> {
  if (columnasCache !== null) return columnasCache;
  const { error } = await supabase.from('servicios').select('titulo').limit(1);
  columnasCache = !error;
  return columnasCache;
}

// Extrae los campos estructurados que se guardaron embebidos en `descripcion`
// en versiones anteriores del sistema (formato: "Título: ...\nCategoría: ...").
function parseDescripcionLegacy(servicio: Record<string, unknown>) {
  const s = { ...servicio };
  const descripcion = (s.descripcion as string) || '';
  const match = descripcion.match(/^Título: (.+)\nCategoría: (.+)\nPrioridad: (.+)\nDirección: (.+)\n\nDetalles:\n([\s\S]*)$/);
  if (match) {
    s.titulo = s.titulo || match[1];
    s.categoria = s.categoria || match[2];
    s.prioridad = s.prioridad || match[3];
    s.direccion = s.direccion || match[4];
    s.descripcion = match[5];
  }
  return s;
}

export async function GET(request: Request) {
  try {
    const supabase = getSupabase();

    if (!supabase) {
      return NextResponse.json({ data: [], message: 'Modo local sin conexión a Supabase' }, { status: 200 });
    }

    const { searchParams } = new URL(request.url);
    const clienteId = searchParams.get('cliente_id');
    const tecnicoId = searchParams.get('tecnico_id');

    let query = supabase
      .from('servicios')
      .select('*, clientes ( nombre ), tecnicos ( nombre )');

    if (clienteId) query = query.eq('cliente_id', clienteId);
    if (tecnicoId) query = query.eq('tecnico_id', tecnicoId);

    const { data, error } = await query.order('fecha_creacion', { ascending: false });

    if (error) throw error;

    const servicios = data.map((s: Record<string, unknown>) => {
      const parsed = parseDescripcionLegacy(s);
      return {
        id: parsed.id,
        titulo: parsed.titulo || null,
        categoria: parsed.categoria || null,
        prioridad: parsed.prioridad || 'Media',
        direccion: parsed.direccion || null,
        descripcion: parsed.descripcion,
        estado: parsed.estado,
        fecha_creacion: parsed.fecha_creacion,
        fecha_completado: parsed.fecha_completado,
        cliente_id: parsed.cliente_id,
        cliente_nombre: (parsed.clientes as { nombre?: string } | null)?.nombre || 'Sin cliente',
        tecnico_nombre: (parsed.tecnicos as { nombre?: string } | null)?.nombre || 'Sin asignar',
        reporte_descripcion: parsed.reporte_descripcion || null,
        cantidad: parsed.cantidad ?? 0,
        costo: parsed.costo ?? 0,
        tiempo: parsed.tiempo ?? 0,
        notas_tecnicas: parsed.notas_tecnicas || null,
      };
    });

    return NextResponse.json({ data: servicios }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error GET /api/servicios:', message);
    return NextResponse.json({ error: 'Error al obtener servicios.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();

    const body = await request.json();
    const { titulo, categoria, prioridad, direccion, descripcion } = body;

    if (!titulo || !categoria || !prioridad || !direccion || !descripcion) {
      return NextResponse.json(
        { error: 'Todos los campos del servicio son obligatorios.' },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { message: 'Servicio registrado (Modo Local - Sin Supabase)' },
        { status: 200 }
      );
    }

    // Asignar el servicio al cliente autenticado
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const user = await verifySessionToken(sessionCookie);
    if (!user) {
      return NextResponse.json({ error: 'Sesión inválida' }, { status: 401 });
    }

    const { data: cliente, error: clienteError } = await supabase
      .from('clientes')
      .select('id')
      .eq('usuario_id', user.id)
      .single();

    if (clienteError || !cliente) {
      return NextResponse.json(
        { error: 'No se encontró un perfil de cliente para tu cuenta.' },
        { status: 400 }
      );
    }

    const migrado = await tieneCamposNuevos(supabase);
    const insert: Record<string, unknown> = { cliente_id: cliente.id, estado: 'Pendiente' };

    if (migrado) {
      insert.titulo = titulo;
      insert.categoria = categoria;
      insert.prioridad = prioridad;
      insert.direccion = direccion;
      insert.descripcion = descripcion;
    } else {
      // BD sin migrar: embebe los datos en la descripción (compatibilidad).
      insert.descripcion = `Título: ${titulo}\nCategoría: ${categoria}\nPrioridad: ${prioridad}\nDirección: ${direccion}\n\nDetalles:\n${descripcion}`;
    }

    const { data, error } = await supabase
      .from('servicios')
      .insert([insert]);

    if (error) {
      console.error('Error insertando servicio:', error);
      return NextResponse.json({ error: 'Error al insertar en Supabase' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Servicio creado exitosamente', data }, { status: 200 });

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
    const supabase = getSupabase();

    const body = await request.json();
    const { id, estado, tecnico_id } = body;

    if (!id) {
      return NextResponse.json({ error: 'El ID del servicio es obligatorio.' }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({ message: 'Estado actualizado (Modo Local)' }, { status: 200 });
    }

    const migrado = await tieneCamposNuevos(supabase);
    const updates: Record<string, unknown> = {};
    if (estado) updates.estado = estado;
    if (tecnico_id) updates.tecnico_id = tecnico_id;
    if (migrado) {
      if (body.reporte_descripcion !== undefined) updates.reporte_descripcion = body.reporte_descripcion;
      if (body.cantidad !== undefined) updates.cantidad = body.cantidad;
      if (body.costo !== undefined) updates.costo = body.costo;
      if (body.tiempo !== undefined) updates.tiempo = body.tiempo;
      if (body.notas_tecnicas !== undefined) updates.notas_tecnicas = body.notas_tecnicas;
    }
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
    const supabase = getSupabase();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'El ID del servicio es obligatorio.' }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({ message: 'Servicio eliminado (Modo Local)' }, { status: 200 });
    }

    const { error } = await supabase.from('servicios').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Servicio eliminado' }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error DELETE /api/servicios:', message);
    return NextResponse.json({ error: 'Error al eliminar servicio.' }, { status: 500 });
  }
}
