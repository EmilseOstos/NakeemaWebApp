"use client";

import { useEffect, useState } from "react";

type Servicio = {
  id: string;
  descripcion: string;
  estado: string;
  fecha_creacion: string;
  cliente_nombre: string;
};

export default function MisServiciosPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServicio, setSelectedServicio] = useState<Servicio | null>(null);
  const [nuevoEstado, setNuevoEstado] = useState("");

  useEffect(() => {
    fetch('/api/perfil')
      .then(res => res.json())
      .then(async (data) => {
        if (data.data?.id) {
          const res = await fetch(`/api/servicios?tecnico_id=${data.data.id}`);
          const json = await res.json();
          setServicios(json.data || []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const activos = servicios.filter(s => s.estado !== 'Finalizado' && s.estado !== 'Completado' && s.estado !== 'Cancelado').length;
  const completadosHoy = servicios.filter(s =>
    (s.estado === 'Finalizado' || s.estado === 'Completado') &&
    new Date(s.fecha_creacion).toDateString() === new Date().toDateString()
  ).length;

  const badgeClass = (estado: string) => {
    if (estado === 'Finalizado' || estado === 'Completado') return 'bg-[#0da766] text-white';
    if (estado === 'En Proceso') return 'bg-yellow-400 text-yellow-900';
    if (estado === 'Cancelado') return 'bg-red-500 text-white';
    return 'bg-gray-200 text-gray-700';
  };

  const priorityClass = (prioridad: string) => {
    if (prioridad === 'Alta') return 'bg-red-500 text-white';
    if (prioridad === 'Media') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-600';
  };

  const extractPriority = (descripcion: string) => {
    if (!descripcion) return 'Media';
    if (descripcion.includes('Alta') || descripcion.includes('alta')) return 'Alta';
    if (descripcion.includes('Baja') || descripcion.includes('baja')) return 'Baja';
    return 'Media';
  };

  const handleGuardarEstado = async () => {
    if (!selectedServicio || !nuevoEstado) return;
    try {
      const res = await fetch('/api/servicios', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedServicio.id, estado: nuevoEstado }),
      });
      if (res.ok) {
        setModalOpen(false);
        const data = await fetch(`/api/perfil`).then(r => r.json());
        if (data.data?.id) {
          const r = await fetch(`/api/servicios?tecnico_id=${data.data.id}`);
          const j = await r.json();
          setServicios(j.data || []);
        }
      } else {
        alert('Error al actualizar estado');
      }
    } catch {
      alert('Error de conexión');
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500 font-medium">Cargando...</div>;
  }

  return (
    <div className="space-y-5">
      <h3 className="font-black text-[#0da766] text-2xl">Mis Servicios Asignados</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-yellow-400 flex justify-between items-center">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Servicios Activos</div>
            <div className="text-3xl font-black text-gray-800">{activos}</div>
          </div>
          <span className="text-4xl opacity-30">🔧</span>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-[#0da766] flex justify-between items-center">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Completados Hoy</div>
            <div className="text-3xl font-black text-gray-800">{completadosHoy}</div>
          </div>
          <span className="text-4xl opacity-30 text-[#0da766]">✓</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <div className="font-bold text-gray-500">Lista de Tareas Pendientes</div>
        </div>
        {servicios.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No tienes servicios asignados.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead className="bg-white border-b border-gray-100">
                <tr>
                  {["ID", "Cliente", "Prioridad", "Estado", "Acción"].map((h, i) => (
                    <th key={i} className={`py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider ${i === 0 ? "text-left" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {servicios.map((s, i) => (
                  <tr key={s.id || i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-left">
                      <div className="font-black text-gray-800">{s.id?.slice(0, 8)}</div>
                    </td>
                    <td className="py-4 px-4 font-bold text-gray-700">{s.cliente_nombre}</td>
                    <td className="py-4 px-4">
                      <span className={`${priorityClass(extractPriority(s.descripcion))} text-xs font-bold px-3 py-1 rounded-full`}>
                        {extractPriority(s.descripcion)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`${badgeClass(s.estado)} text-xs font-bold px-3 py-1.5 rounded-full inline-block w-full max-w-[100px]`}>{s.estado}</span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => { setSelectedServicio(s); setNuevoEstado(s.estado); setModalOpen(true); }}
                        className="px-4 py-2 bg-[#0da766] text-white rounded-full font-bold text-xs hover:bg-[#0a8752] transition-colors"
                      >
                        Gestionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && selectedServicio && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h5 className="font-black text-[#0da766] text-xl">#{selectedServicio.id?.slice(0, 8)}</h5>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <div className="space-y-3 text-sm mb-6 pb-6 border-b border-gray-100">
              <div><strong className="text-gray-500">Cliente:</strong> <span className="text-gray-800 font-medium">{selectedServicio.cliente_nombre}</span></div>
              <div><strong className="text-gray-500">Estado actual:</strong> <span className={`${badgeClass(selectedServicio.estado)} text-xs font-bold px-2 py-0.5 rounded-full`}>{selectedServicio.estado}</span></div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Cambiar Estado</label>
                <select
                  value={nuevoEstado}
                  onChange={e => setNuevoEstado(e.target.value)}
                  className="w-full bg-gray-50 border-0 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-[#0da766]/30"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">Cerrar</button>
              <button onClick={handleGuardarEstado} className="flex-1 py-3 bg-[#0da766] text-white rounded-full font-bold text-sm hover:bg-[#0a8752] transition-colors shadow-sm">Guardar</button>
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-gray-400 text-xs py-3">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
