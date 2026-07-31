"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Servicio = {
  id: string;
  titulo?: string | null;
  prioridad?: string | null;
  descripcion: string;
  estado: string;
  fecha_creacion: string;
  fecha_completado?: string;
  cliente_nombre: string;
};

type Tecnico = {
  id: string;
  nombre: string;
};

export default function TecnicoDashboard() {
  const router = useRouter();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [tecnico, setTecnico] = useState<Tecnico | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Servicio | null>(null);

  useEffect(() => {
    fetch('/api/perfil')
      .then(res => res.json())
      .then(async (data) => {
        if (data.data?.id) {
          setTecnico(data.data);
          const res = await fetch(`/api/servicios?tecnico_id=${data.data.id}`);
          const json = await res.json();
          setServicios(json.data || []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const asignados = servicios.length;
  const enProceso = servicios.filter(s => s.estado === 'En Proceso').length;
  const hoy = new Date().toDateString();
  const cerradosHoy = servicios.filter(s =>
    (s.estado === 'Finalizado' || s.estado === 'Completado') &&
    (s.fecha_completado ? new Date(s.fecha_completado).toDateString() === hoy : new Date(s.fecha_creacion).toDateString() === hoy)
  ).length;

  const formatFecha = (fecha?: string) =>
    fecha ? new Date(fecha).toLocaleDateString("es-CO") : "—";

  const badgeClass = (estado: string) => {
    if (estado === 'Finalizado' || estado === 'Completado') return 'bg-[#0da766] text-white';
    if (estado === 'En Proceso') return 'bg-yellow-400 text-yellow-900';
    if (estado === 'Cancelado') return 'bg-red-500 text-white';
    return 'bg-gray-200 text-gray-700';
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500 font-medium">Cargando...</div>;
  }

  return (
    <div className="space-y-5">
      <div className="nk-card p-7">
        <div className="text-center mb-7">
          <h2 className="text-2xl font-black text-gray-800 mb-1">¡Hola {tecnico?.nombre || 'Técnico'}! 👋</h2>
          <p className="text-gray-400 font-medium">Resumen de tu jornada</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Servicios Asignados", value: String(asignados) },
            { label: "En Proceso", value: String(enProceso) },
            { label: "Cerrados Hoy", value: String(cerradosHoy) },
          ].map((k, i) => (
            <div key={i} className="nk-card stat-card">
              <h3>{k.label}</h3>
              <div className="value">{k.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="nk-card p-6">
        <h4 className="font-bold text-gray-600 text-sm uppercase tracking-wider mb-5">Próximos Servicios Asignados</h4>
        {servicios.length === 0 ? (
          <p className="text-center text-gray-400 py-6">No tienes servicios asignados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-custom">
              <thead>
                <tr>
                  {["ID Servicio", "Cliente", "Estado", "Acciones"].map((h, i) => (
                    <th key={i} className={`pb-3 text-xs font-bold uppercase tracking-wider text-gray-400 ${i === 3 ? "text-right" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {servicios.map((s, i) => (
                  <tr key={s.id || i}>
                    <td className="py-4 pr-4"><span className="font-bold text-gray-500 text-sm">{s.id?.slice(0, 8)}</span></td>
                    <td className="py-4 pr-4">
                      <div className="font-bold text-gray-800 text-sm">{s.cliente_nombre}</div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`status-badge ${badgeClass(s.estado)}`}>{s.estado}</span>
                    </td>
                    <td className="py-4 text-right">
                      <button onClick={() => setSelected(s)} className="bg-[#0da766] text-white font-bold text-xs px-4 py-2 rounded-full hover:bg-[#0a8752] transition-colors shadow-sm">Ver Detalles</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="nk-card p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-gray-800 text-lg">Servicio</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              {selected.titulo && <div className="flex justify-between"><span className="text-gray-500 font-medium">Título:</span><span className="font-bold text-gray-800 text-right">{selected.titulo}</span></div>}
              <div className="flex justify-between"><span className="text-gray-500 font-medium">Cliente:</span><span className="font-bold text-gray-800 text-right">{selected.cliente_nombre}</span></div>
              {selected.prioridad && (
                <div className="flex justify-between"><span className="text-gray-500 font-medium">Prioridad:</span>
                  <span className={`status-badge ${selected.prioridad === 'Alta' ? 'bg-red-500 text-white' : selected.prioridad === 'Media' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{selected.prioridad}</span>
                </div>
              )}
              <div className="flex justify-between"><span className="text-gray-500 font-medium">Estado:</span><span className={`status-badge ${badgeClass(selected.estado)}`}>{selected.estado}</span></div>
              <div className="border-t border-gray-100 pt-3">
                <span className="text-gray-500 font-medium">Descripción:</span>
                <p className="text-gray-800 mt-1.5 bg-gray-50 rounded-xl p-3 whitespace-pre-wrap max-h-48 overflow-y-auto">{selected.descripcion || "Sin descripción"}</p>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Creado: {formatFecha(selected.fecha_creacion)}</span>
                {selected.fecha_completado && <span>Completado: {formatFecha(selected.fecha_completado)}</span>}
              </div>
            </div>
            <button
              onClick={() => { setSelected(null); router.push(`/dashboard/chat?servicio=${selected.id}`); }}
              className="mt-6 w-full bg-[#0da766] text-white font-bold py-3 rounded-xl hover:bg-[#0a8752] transition-colors"
            >
              💬 Abrir Chat del Servicio
            </button>
            <button onClick={() => setSelected(null)} className="mt-2 w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">Cerrar</button>
          </div>
        </div>
      )}

      <p className="nk-footer-inline">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
