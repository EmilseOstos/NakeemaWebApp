import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ data: null, message: 'Modo local sin conexión' }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from('configuracion').select('*').limit(1).single();
    if (error) throw error;

    return NextResponse.json({ data }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error GET /api/configuracion:', message);
    return NextResponse.json({ error: 'Error al obtener configuración' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ message: 'Configuración actualizada (Modo Local)', data: body }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: existing } = await supabase.from('configuracion').select('id').limit(1).single();

    const updates = {
      ...(body.nombre_empresa !== undefined && { nombre_empresa: body.nombre_empresa }),
      ...(body.correo_contacto !== undefined && { correo_contacto: body.correo_contacto }),
      ...(body.direccion !== undefined && { direccion: body.direccion }),
      ...(body.logo_url !== undefined && { logo_url: body.logo_url }),
      ...(body.modo_oscuro !== undefined && { modo_oscuro: body.modo_oscuro }),
      ...(body.notificaciones_correo !== undefined && { notificaciones_correo: body.notificaciones_correo }),
      ...(body.alertas_sms !== undefined && { alertas_sms: body.alertas_sms }),
      ...(body.auto_asignar_servicios !== undefined && { auto_asignar_servicios: body.auto_asignar_servicios }),
      actualizado_en: new Date().toISOString(),
    };

    let result;
    if (existing?.id) {
      const { data, error } = await supabase.from('configuracion').update(updates).eq('id', existing.id).select().single();
      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await supabase.from('configuracion').insert([updates]).select().single();
      if (error) throw error;
      result = data;
    }

    return NextResponse.json({ message: 'Configuración guardada', data: result }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error PUT /api/configuracion:', message);
    return NextResponse.json({ error: 'Error al guardar configuración' }, { status: 500 });
  }
}
