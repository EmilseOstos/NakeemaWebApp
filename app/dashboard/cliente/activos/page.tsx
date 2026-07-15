"use client";

import { useEffect, useState } from "react";

type Servicio = {
  id: string;
  descripcion: string;
  estado: string;
  fecha_creacion: string;
  cliente_nombre: string;
  tecnico_nombre: string;
};

export default function ServiciosActivosPage() {
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

  return (
    <div className="space-y-5">
      <h3 className="font-black text-[#0da766] text-2xl">Mis Solicitudes de Servicio</h3>

      {loading ? (
        <div className="text-center py-10 text-gray-500 font-medium">Cargando...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["ID Servicio", "Descripción", "Fecha", "Técnico", "Estado", "Detalles"].map((h, i) => (
                    <th key={i} className={`py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider ${i === 1 ? "text-left" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {servicios.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">No tienes servicios registrados.</td>
                  </tr>
                ) : (
                  servicios.map((s, i) => (
                    <tr key={s.id || i} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-bold text-gray-500">{s.id?.slice(0, 8)}</td>
                      <td className="py-4 px-4 text-left font-medium text-gray-700">{s.descripcion?.slice(0, 50)}</td>
                      <td className="py-4 px-4 text-gray-400">{new Date(s.fecha_creacion).toLocaleDateString()}</td>
                      <td className="py-4 px-4 text-gray-700">{s.tecnico_nombre}</td>
                      <td className="py-4 px-4">
                        <span className={`${badgeClass(s.estado)} text-xs font-bold px-4 py-1.5 rounded-full`}>{s.estado}</span>
                      </td>
                      <td className="py-4 px-4">
                        <button onClick={() => setSelected(s)} className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto hover:bg-blue-100 transition-colors">👁️</button>
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
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-black text-[#0da766] text-lg">Detalle</h3>
                <p className="text-gray-500 text-sm mt-0.5">ID: {selected.id?.slice(0, 8)}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between border-b border-gray-50 pb-2"><span className="font-bold text-gray-500">Técnico:</span><span className="text-gray-800">{selected.tecnico_nombre}</span></div>
              <div className="flex justify-between border-b border-gray-50 pb-2"><span className="font-bold text-gray-500">Fecha:</span><span className="text-gray-800">{new Date(selected.fecha_creacion).toLocaleDateString()}</span></div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-500">Estado:</span>
                <span className={`${badgeClass(selected.estado)} text-xs font-bold px-3 py-1 rounded-full`}>{selected.estado}</span>
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="mt-6 w-full bg-[#0da766] text-white font-bold py-3 rounded-xl hover:bg-[#0a8752] transition-colors">Cerrar</button>
          </div>
        </div>
      )}

      <p className="text-center text-gray-400 text-xs py-3">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
