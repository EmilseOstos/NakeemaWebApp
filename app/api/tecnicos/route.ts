import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function GET() {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { data: [], message: 'Modo local sin conexión a Supabase' },
        { status: 200 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('tecnicos')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) {
      console.error('Error fetching tecnicos:', error);
      return NextResponse.json({ error: 'Error al obtener técnicos' }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err: any) {
    console.error('Error en GET /api/tecnicos:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, especialidad, telefono, estado } = body;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { message: 'Técnico registrado (Modo Local)', data: body },
        { status: 200 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // OMITIMOS el usuario_id porque la base de datos permite que sea nulo si no creamos cuenta de login
    const { data, error } = await supabase
      .from('tecnicos')
      .insert([
        {
          nombre,
          especialidad,
          telefono,
          estado: estado || 'Disponible'
        }
      ])
      .select();

    if (error) {
      console.error('Error insertando tecnico:', error);
      return NextResponse.json({ error: 'Error al insertar en Supabase', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Técnico creado exitosamente', data: data?.[0] }, { status: 200 });

  } catch (err: any) {
    console.error('Error en POST /api/tecnicos:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor.', details: err.message },
      { status: 500 }
    );
  }
}
