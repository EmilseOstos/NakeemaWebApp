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
          <div key={i} className="nk-card stat-card">
            <h3>{kpi.label}</h3>
            <div className={`value ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <div className="nk-card">
          <h4 className="text-center text-gray-700 font-bold mb-5 text-base pb-2 border-b border-gray-100">Panel General</h4>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/dashboard/admin/gestion")}
              className="panel-btn"
            >
              <span className="title">Registros completados:</span>
              <span className="val">{loadingServicios ? "…" : serviciosCompletados}</span>
            </button>

            <button
              onClick={() => router.push("/dashboard/admin/gestion")}
              className="panel-btn"
            >
              <span className="title">Servicios Pendientes:</span>
              <span className="val">{loadingServicios ? "…" : serviciosPendientes}</span>
            </button>

            <button
              onClick={() => router.push("/dashboard/admin/reportes")}
              className="panel-btn"
            >
              <span className="title">Historial de Servicios</span>
            </button>
          </div>
        </div>

        <div className="nk-card">
          <h4 className="text-center text-gray-700 font-bold mb-5 text-base pb-2 border-b border-gray-100">Estado Técnicos</h4>
          <div className="overflow-y-auto max-h-[320px]">
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
                <div key={t.id} className="tech-status-item">
                  <div className="tech-status-info">
                    <div className="tech-status-avatar bg-[#0da766]">
                      {t.nombre.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="fw-600 fs-14">{t.nombre}</div>
                      <div className="text-gray-400 text-xs">{t.especialidad}</div>
                    </div>
                  </div>
                  <span className={`status-badge ${badgeStyle[t.estado] || "bg-gray-200 text-gray-700"}`}>
                    {t.estado}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <p className="nk-footer-inline">
        © 2026 Todos los derechos Reservados. Nakeema
      </p>
    </div>
  );
}
