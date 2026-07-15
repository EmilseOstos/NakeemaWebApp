import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifySessionToken } from '@/lib/session';
import { cookies } from 'next/headers';

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
      return NextResponse.json({ data: null, message: 'Modo local' }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    let profile = null;

    if (user.rol === 'Cliente') {
      const { data } = await supabase
        .from('clientes')
        .select('*')
        .eq('usuario_id', user.id)
        .single();
      profile = data;
    } else if (user.rol === 'Técnico') {
      const { data } = await supabase
        .from('tecnicos')
        .select('*')
        .eq('usuario_id', user.id)
        .single();
      profile = data;
    }

    return NextResponse.json({ data: profile, rol: user.rol }, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error GET /api/perfil:', message);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
