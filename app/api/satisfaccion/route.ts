import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    const body = await request.json();
    const { idServicio, calificacion, comentario, cliente } = body;

    if (!idServicio || !calificacion) {
      return NextResponse.json(
        { error: 'El servicio y la calificación son obligatorios.' },
        { status: 400 }
      );
    }

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { message: 'Evaluación guardada (Modo Local - Sin Supabase)', data: body },
        { status: 200 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('satisfaccion')
      .insert([
        {
          servicio_id: idServicio,
          calificacion,
          comentario,
          cliente_nombre: cliente
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error insertando satisfacción:', error);
      return NextResponse.json({ error: 'Error al guardar la evaluación.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Evaluación guardada exitosamente', data }, { status: 201 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error en POST /api/satisfaccion:', message);
    return NextResponse.json({ error: 'Error interno del servidor', details: message }, { status: 500 });
  }
}
