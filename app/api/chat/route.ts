import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { data: [], message: 'Modo local sin conexión a Supabase' },
        { status: 200 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Recuperar el query param de la URL: /api/chat?idServicio=UUID
    const { searchParams } = new URL(request.url);
    const idServicio = searchParams.get('idServicio');

    if (!idServicio) {
      return NextResponse.json(
        { error: 'El parámetro idServicio es requerido en la URL.' },
        { status: 400 }
      );
    }

    // Traemos los mensajes vinculados a un servicio, ordenados por fecha ascendente
    // Hacemos JOIN con usuarios y roles para pintar la interfaz gráfica de chat con facilidad (ej: "Marlon (Técnico): ...")
    const { data: mensajes, error } = await supabase
      .from('chat_mensajes')
      .select(`
        id,
        mensaje,
        fecha_envio,
        leido,
        usuarios (
          username,
          roles (
            nombre
          )
        )
      `)
      .eq('servicio_id', idServicio)
      .order('fecha_envio', { ascending: true });

    if (error) throw error;

    return NextResponse.json(
      { 
        message: 'Historial de chat recuperado exitosamente',
        data: mensajes 
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error GET /api/chat:', message);
    return NextResponse.json(
      { error: 'Error al recuperar el historial del chat.', details: message },
      { status: 500 }
    );
  }
}

// POST: Enviar un nuevo mensaje (Técnico o Cliente)
export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { message: 'Mensaje enviado (Modo Local - Sin Supabase)' },
        { status: 200 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await request.json();
    const { servicio_id, remitente_id, mensaje } = body;

    // Validación de integridad
    if (!servicio_id || !remitente_id || !mensaje || String(mensaje).trim() === '') {
      return NextResponse.json(
        { error: 'Faltan datos (servicio_id, remitente_id, mensaje) o el mensaje está vacío.' },
        { status: 400 }
      );
    }

    // Inserción en tabla chat_mensajes
    const { data: nuevoMensaje, error } = await supabase
      .from('chat_mensajes')
      .insert([
        {
          servicio_id,
          remitente_id,
          mensaje
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      { 
        message: 'Mensaje enviado correctamente', 
        data: nuevoMensaje 
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error POST /api/chat:', message);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje.', details: message },
      { status: 500 }
    );
  }
}
