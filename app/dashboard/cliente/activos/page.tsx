"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Servicio = {
  id: string;
  titulo?: string | null;
  categoria?: string | null;
  prioridad?: string | null;
  direccion?: string | null;
  descripcion: string;
  estado: string;
  fecha_creacion: string;
  cliente_nombre: string;
  tecnico_nombre: string;
  reporte_descripcion?: string | null;
};

export default function ServiciosActivosPage() {
  const router = useRouter();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Servicio | null>(null);

  useEffect(() => {
    fetch('/api/perfil')
      .then(res => res.json())
      .then(data => {
        if (data.data?.id) {
          return fetch(`/api/servicios?cliente_id=${data.data.id}`);
        }
        return null;
      })
      .then(res => res?.json().then(d => setServicios(d.data || [])))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const badgeClass = (estado: string) => {
    if (estado === 'Finalizado' || estado === 'Completado') return 'bg-[#0da766] text-white';
    if (estado === 'En Proceso') return 'bg-yellow-400 text-yellow-900';
    if (estado === 'Cancelado') return 'bg-red-500 text-white';
    return 'bg-gray-200 text-gray-700';
  };

  const formatFecha = (fecha?: string) =>
    fecha ? new Date(fecha).toLocaleDateString("es-CO") : "—";

  return (
    <div className="space-y-5">
      <h3 className="font-black text-[#0da766] text-2xl">Mis Solicitudes de Servicio</h3>

      {loading ? (
        <div className="text-center py-10 text-gray-500 font-medium">Cargando...</div>
      ) : (
        <div className="nk-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-custom w-full text-sm text-center">
              <thead>
                <tr>
                  {["ID Servicio", "Descripción", "Fecha", "Técnico", "Estado", "Detalles"].map((h, i) => (
                    <th key={i} className={`${i === 1 ? "text-left" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {servicios.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">No tienes servicios registrados.</td>
                  </tr>
                ) : (
                  servicios.map((s, i) => (
                    <tr key={s.id || i}>
                      <td className="py-4 px-4 font-bold text-gray-500">{s.id?.slice(0, 8)}</td>
                      <td className="py-4 px-4 text-left font-medium text-gray-700">{s.descripcion?.slice(0, 50)}</td>
                      <td className="py-4 px-4 text-gray-400">{formatFecha(s.fecha_creacion)}</td>
                      <td className="py-4 px-4 text-gray-700">{s.tecnico_nombre}</td>
                      <td className="py-4 px-4">
                        <span className={`status-badge ${badgeClass(s.estado)}`}>{s.estado}</span>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => setSelected(s)}
                          className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto hover:bg-blue-100 transition-colors"
                          aria-label={`Ver detalle del servicio ${s.id?.slice(0, 8)}`}
                          title="Ver detalles"
                        >👁️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="nk-card p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-black text-[#0da766] text-lg">Detalle</h3>
                <p className="text-gray-500 text-sm mt-0.5">ID: {selected.id?.slice(0, 8)}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <div className="space-y-3.5 text-sm">
              {selected.titulo && (
                <div className="border-b border-gray-50 pb-2">
                  <span className="font-bold text-gray-500">Título:</span>
                  <p className="text-gray-800 font-semibold mt-0.5">{selected.titulo}</p>
                </div>
              )}
              {selected.prioridad && (
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="font-bold text-gray-500">Prioridad:</span>
                  <span className={`status-badge ${selected.prioridad === 'Alta' ? 'bg-red-500 text-white' : selected.prioridad === 'Media' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{selected.prioridad}</span>
                </div>
              )}
              {selected.direccion && (
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="font-bold text-gray-500">Dirección:</span>
                  <span className="text-gray-800 text-right">{selected.direccion}</span>
                </div>
              )}
              <div className="border-b border-gray-50 pb-2">
                <span className="font-bold text-gray-500">Descripción:</span>
                <p className="text-gray-800 mt-1.5 bg-gray-50 rounded-xl p-3 whitespace-pre-wrap max-h-48 overflow-y-auto">{selected.descripcion || "Sin descripción"}</p>
              </div>
              {selected.reporte_descripcion && (
                <div className="border-b border-gray-50 pb-2">
                  <span className="font-bold text-gray-500">Reporte del técnico:</span>
                  <p className="text-gray-800 mt-1.5 bg-green-50 rounded-xl p-3 whitespace-pre-wrap max-h-40 overflow-y-auto">{selected.reporte_descripcion}</p>
                </div>
              )}
              <div className="flex justify-between border-b border-gray-50 pb-2"><span className="font-bold text-gray-500">Técnico:</span><span className="text-gray-800 text-right">{selected.tecnico_nombre}</span></div>
              <div className="flex justify-between border-b border-gray-50 pb-2"><span className="font-bold text-gray-500">Fecha:</span><span className="text-gray-800">{formatFecha(selected.fecha_creacion)}</span></div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-500">Estado:</span>
                <span className={`status-badge ${badgeClass(selected.estado)}`}>{selected.estado}</span>
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
