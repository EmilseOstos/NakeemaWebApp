"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Tecnico = {
  id: string;
  nombre: string;
  especialidad: string;
  estado: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [serviciosHoy, setServiciosHoy] = useState(0);
  const [serviciosPendientes, setServiciosPendientes] = useState(0);
  const [serviciosCompletados, setServiciosCompletados] = useState(0);
  const [tecnicosActivos, setTecnicosActivos] = useState(0);
  const [loadingTecnicos, setLoadingTecnicos] = useState(true);
  const [errorTecnicos, setErrorTecnicos] = useState(false);
  const [loadingServicios, setLoadingServicios] = useState(true);

  const fetchTecnicos = useCallback(async () => {
    setLoadingTecnicos(true);
    setErrorTecnicos(false);
    try {
      const res = await fetch('/api/tecnicos');
      const data = await res.json();
      const list = data.data || [];
      setTecnicos(list);
      setTecnicosActivos(list.filter((t: Tecnico) => t.estado === 'Disponible').length);
    } catch {
      setErrorTecnicos(true);
    } finally {
      setLoadingTecnicos(false);
    }
  }, []);

  const fetchServicios = useCallback(async () => {
    setLoadingServicios(true);
    try {
      const res = await fetch('/api/servicios');
      const data = await res.json();
      const list = data.data || [];
      const today = new Date().toISOString().slice(0, 10);
      setServiciosHoy(list.filter((s: Record<string, unknown>) => (s.fecha_creacion as string)?.startsWith(today)).length);
      setServiciosPendientes(list.filter((s: Record<string, unknown>) => s.estado === 'Pendiente' || s.estado === 'En Proceso').length);
      setServiciosCompletados(list.filter((s: Record<string, unknown>) => s.estado === 'Finalizado' || s.estado === 'Completado').length);
    } catch {
      setServiciosHoy(0);
    } finally {
      setLoadingServicios(false);
    }
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => { fetchTecnicos(); }, 0);
    const t2 = setTimeout(() => { fetchServicios(); }, 0);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [fetchTecnicos, fetchServicios]);

  const badgeStyle: Record<string, string> = {
    Disponible: "bg-[#0da766] text-white",
    Ocupado: "bg-yellow-400 text-yellow-900",
    Inactivo: "bg-red-500 text-white",
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-5">
        {[
          { label: "Servicios Hoy", value: loadingServicios ? "—" : String(serviciosHoy), color: "text-[#0da766]" },
          { label: "Técnicos Activos", value: loadingTecnicos ? "—" : String(tecnicosActivos), color: "text-[#0da766]" },
          { label: "Servicios Pendientes", value: loadingServicios ? "—" : String(serviciosPendientes), color: "text-red-500" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-2">{kpi.label}</p>
            <p className={`text-4xl font-black ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-center text-gray-700 font-bold mb-5 text-base">Panel General</h4>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/dashboard/admin/gestion")}
              className="w-full bg-[#0da766] hover:bg-[#0a8752] text-white rounded-xl py-4 px-5 text-center transition-colors shadow-sm"
            >
              <p className="text-xs font-medium opacity-80 mb-0.5">Registros completados:</p>
              <p className="text-3xl font-black">{loadingServicios ? "…" : serviciosCompletados}</p>
            </button>

            <button
              onClick={() => router.push("/dashboard/admin/gestion")}
              className="w-full bg-[#0da766] hover:bg-[#0a8752] text-white rounded-xl py-4 px-5 text-center transition-colors shadow-sm"
            >
              <p className="text-xs font-medium opacity-80 mb-0.5">Servicios Pendientes:</p>
              <p className="text-3xl font-black">{loadingServicios ? "…" : serviciosPendientes}</p>
            </button>

            <button
              onClick={() => router.push("/dashboard/admin/reportes")}
              className="w-full bg-[#0da766] hover:bg-[#0a8752] text-white rounded-xl py-3.5 px-5 text-center font-bold transition-colors shadow-sm"
            >
              Historial de Servicios
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-center text-gray-700 font-bold mb-5 text-base">Estado Técnicos</h4>
          <div className="space-y-2 overflow-y-auto max-h-[320px]">
            {loadingTecnicos ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-[#0da766] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : errorTecnicos ? (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm mb-3">No se pudieron cargar los técnicos.</p>
                <button
                  onClick={fetchTecnicos}
                  className="px-4 py-2 bg-[#0da766] text-white rounded-full text-xs font-bold hover:bg-[#0a8752] transition-colors"
                >
                  Reintentar
                </button>
              </div>
            ) : tecnicos.length === 0 ? (
              <p className="text-center text-gray-400 py-8 text-sm">No hay técnicos registrados.</p>
            ) : (
              tecnicos.map((t) => (
                <div key={t.id} className="flex items-center justify-between py-2.5 px-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full bg-[#0da766] flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {t.nombre.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800 leading-tight">{t.nombre}</div>
                      <div className="text-xs text-gray-400">{t.especialidad}</div>
                    </div>
                  </div>
                  <span className={`${badgeStyle[t.estado] || "bg-gray-200 text-gray-700"} text-xs font-bold px-3 py-1 rounded-full`}>
                    {t.estado}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <p className="text-center text-gray-400 text-xs py-3">
        © 2026 Todos los derechos Reservados. Nakeema
      </p>

      <button
        onClick={() => router.push("/dashboard/chat")}
        aria-label="Abrir chat"
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#0da766] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0a8752] transition-colors z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
        </svg>
      </button>
    </div>
  );
}
