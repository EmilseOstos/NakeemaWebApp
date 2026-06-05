import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titulo, categoria, prioridad, direccion, descripcion } = body;

    // Si no hay Supabase configurado, simular éxito
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { message: 'Servicio registrado (Modo Local - Sin Supabase)' },
        { status: 200 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Como el esquema requiere un cliente_id, vamos a buscar el primero disponible
    // En una app real, este ID vendría de la sesión del usuario autenticado
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

    // Construimos la descripción completa basada en los campos del formulario
    const descripcionCompleta = `Título: ${titulo}\nCategoría: ${categoria}\nPrioridad: ${prioridad}\nDirección: ${direccion}\n\nDetalles:\n${descripcion}`;

    const { data, error } = await supabase
      .from('servicios')
      .insert([
        {
          cliente_id: cliente_id,
          descripcion: descripcionCompleta,
          estado: 'Pendiente'
        }
      ]);

    if (error) {
      console.error('Error insertando servicio:', error);
      return NextResponse.json({ error: 'Error al insertar en Supabase' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Servicio creado exitosamente en Supabase', data }, { status: 200 });

  } catch (err: any) {
    console.error('Error en el endpoint de servicios:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor.', details: err.message },
      { status: 500 }
    );
  }
}
