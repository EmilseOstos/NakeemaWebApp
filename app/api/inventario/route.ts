import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Límite para considerar que un material tiene "stock bajo"
const LIMITE_STOCK_BAJO = 5;

// GET: Listar todos los materiales del inventario
export async function GET() {
  // Inicialización del cliente de Supabase ADENTRO de la función
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data: inventario, error } = await supabase
      .from('inventario')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) throw error;

    // Iteramos sobre el resultado para agregar un flag lógico (alerta de stock)
    const inventarioConAlertas = inventario.map((item) => ({
      ...item,
      alertaStockBajo: item.cantidad <= LIMITE_STOCK_BAJO
    }));

    return NextResponse.json(
      { 
        message: 'Inventario obtenido exitosamente',
        data: inventarioConAlertas 
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Error GET /api/inventario:', err);
    return NextResponse.json(
      { error: 'Error al obtener el inventario.', details: err.message },
      { status: 500 }
    );
  }
}

// POST: Actualizar / Solicitar materiales (restar del inventario)
export async function POST(request: Request) {
  // Inicialización del cliente de Supabase ADENTRO de la función
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const body = await request.json();
    const { id, cantidad_a_restar } = body;

    if (!id || cantidad_a_restar === undefined || cantidad_a_restar <= 0) {
      return NextResponse.json(
        { error: 'Se requiere el ID del material y una cantidad a restar válida (mayor a 0).' },
        { status: 400 }
      );
    }

    // 1. Obtener el stock actual para validar
    const { data: itemActual, error: fetchError } = await supabase
      .from('inventario')
      .select('cantidad')
      .eq('id', id)
      .single();

    if (fetchError || !itemActual) {
      return NextResponse.json({ error: 'Material no encontrado en el inventario.' }, { status: 404 });
    }

    const nuevoStock = itemActual.cantidad - cantidad_a_restar;

    // Validación para no permitir stocks negativos
    if (nuevoStock < 0) {
      return NextResponse.json(
        { error: 'Stock insuficiente para satisfacer esta solicitud.', stock_actual: itemActual.cantidad },
        { status: 400 }
      );
    }

    // 2. Proceder a actualizar la cantidad en la BD
    const { data: itemActualizado, error: updateError } = await supabase
      .from('inventario')
      .update({ 
        cantidad: nuevoStock, 
        ultima_actualizacion: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;

    return NextResponse.json(
      { 
        message: 'Stock actualizado con éxito.', 
        data: itemActualizado 
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Error POST /api/inventario:', err);
    return NextResponse.json(
      { error: 'Error al actualizar el inventario.', details: err.message },
      { status: 500 }
    );
  }
}