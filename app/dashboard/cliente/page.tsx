"use client";

import { useEffect, useState } from "react";

type Servicio = {
  id: string;
  titulo?: string | null;
  descripcion: string;
  estado: string;
  fecha_creacion: string;
  cliente_nombre: string;
  tecnico_nombre: string;
};

export default function ClienteDashboard() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [userName, setUserName] = useState("Usuario");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('/api/perfil')
        .then(res => res.json())
        .then(data => {
          if (data.data) {
            if (data.data.nombre) setUserName(data.data.nombre);
            if (data.data.id) {
              return fetch(`/api/servicios?cliente_id=${data.data.id}`);
            }
          }
          return null;
        })
        .then(res => {
          if (res) return res.json();
          return null;
        })
        .then(d => {
          if (d?.data) setServicios(d.data || []);
        })
        .catch(() => {});

      fetch('/api/me')
        .then(res => res.json())
        .then(data => {
          if (data.user) setUserName(prev => prev === "Usuario" ? (data.user.email?.split('@')[0] || 'Usuario') : prev);
        })
        .catch(() => {});
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const pendientes = servicios.filter(s => s.estado === 'Pendiente' || s.estado === 'En Proceso').length;

  const formatFecha = (fecha?: string) =>
    fecha ? new Date(fecha).toLocaleDateString("es-CO") : "—";

  const badgeClass = (estado: string) => {
    if (estado === 'Finalizado' || estado === 'Completado') return 'bg-[#0da766] text-white';
    if (estado === 'En Proceso') return 'bg-yellow-400 text-yellow-900';
    if (estado === 'Cancelado') return 'bg-red-500 text-white';
    return 'bg-gray-200 text-gray-700';
  };

  return (
    <div className="space-y-5">
      <div className="nk-card welcome-card-client p-6">
        <h4 className="font-black text-gray-800 text-xl mb-1">¡Hola, {userName}! 👋</h4>
        <p className="text-gray-500 text-sm">
          Tienes <strong className="text-yellow-500">{pendientes} servicio{pendientes !== 1 ? 's' : ''} en proceso</strong> actualmente.
        </p>
      </div>

      <div className="nk-card px-6 pt-6 pb-2">
        <h5 className="font-black text-[#0da766] text-lg mb-1">Historial Reciente</h5>

        {servicios.length === 0 ? (
          <p className="text-gray-400 text-sm py-6 text-center">Aún no tienes servicios registrados.</p>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 py-3 mb-2">
              <span>Servicio</span>
              <span className="text-center">Estado</span>
              <span className="text-right">Fecha</span>
            </div>
            {servicios.slice(0, 5).map((s, i) => (
              <div key={s.id} className={`grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] items-center py-4 gap-3 ${i < Math.min(servicios.length, 5) - 1 ? "border-b border-gray-50" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-[#0da766] border border-green-100 flex items-center justify-center text-lg flex-shrink-0">
                    🔧
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm leading-tight">{s.titulo || s.descripcion?.slice(0, 40)}</div>
                    <div className="text-gray-400 text-xs">{s.tecnico_nombre}</div>
                  </div>
                </div>
                <div className="md:text-center">
                  <span className={`status-badge ${badgeClass(s.estado)}`}>
                    {s.estado}
                  </span>
                </div>
                <div className="md:text-right text-gray-400 text-sm font-medium">
                  {formatFecha(s.fecha_creacion)}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <p className="nk-footer-inline">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
