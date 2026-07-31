"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/Toast";

type Servicio = {
  id: string;
  descripcion: string;
  prioridad: string;
  estado: string;
  fecha_creacion: string;
  fecha_completado?: string;
  cliente_nombre: string;
};

export default function MisServiciosPage() {
  const router = useRouter();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServicio, setSelectedServicio] = useState<Servicio | null>(null);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

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
  const hoy = new Date().toDateString();
  const completadosHoy = servicios.filter(s =>
    (s.estado === 'Finalizado' || s.estado === 'Completado') &&
    (s.fecha_completado ? new Date(s.fecha_completado).toDateString() === hoy : new Date(s.fecha_creacion).toDateString() === hoy)
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

  const handleGuardarEstado = async () => {
    if (!selectedServicio || !nuevoEstado) return;
    setGuardando(true);
    try {
      const res = await fetch('/api/servicios', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedServicio.id, estado: nuevoEstado }),
      });
      if (res.ok) {
        setToast(`Servicio actualizado a "${nuevoEstado}"`);
        setToastType("success");
        setModalOpen(false);
        const data = await fetch(`/api/perfil`).then(r => r.json());
        if (data.data?.id) {
          const r = await fetch(`/api/servicios?tecnico_id=${data.data.id}`);
          const j = await r.json();
          setServicios(j.data || []);
        }
      } else {
        setToast("Error al actualizar estado");
        setToastType("error");
      }
    } catch {
      setToast("Error de conexión");
      setToastType("error");
    } finally {
      setGuardando(false);
      setTimeout(() => setToast(""), 3000);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500 font-medium">Cargando...</div>;
  }

  return (
    <div className="space-y-5">
      <h3 className="font-black text-[#0da766] text-2xl">Mis Servicios Asignados</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="nk-card stat-card">
          <h3>Servicios Activos</h3>
          <div className="value text-gray-800">{activos}</div>
        </div>
        <div className="nk-card stat-card">
          <h3>Completados Hoy</h3>
          <div className="value text-[#0da766]">{completadosHoy}</div>
        </div>
      </div>

      <div className="nk-card overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <div className="font-bold text-gray-500">Lista de Tareas Pendientes</div>
        </div>
        {servicios.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No tienes servicios asignados.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center table-custom">
              <thead>
                <tr>
                  {["ID", "Cliente", "Prioridad", "Estado", "Acción"].map((h, i) => (
                    <th key={i} className={`py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider ${i === 0 ? "text-left" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {servicios.map((s, i) => (
                  <tr key={s.id || i}>
                    <td className="py-4 px-4 text-left">
                      <div className="font-black text-gray-800">{s.id?.slice(0, 8)}</div>
                    </td>
                    <td className="py-4 px-4 font-bold text-gray-700">{s.cliente_nombre}</td>
                    <td className="py-4 px-4">
                      <span className={`status-badge ${priorityClass(s.prioridad)}`}>
                        {s.prioridad || 'Media'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`status-badge ${badgeClass(s.estado)} inline-block w-full max-w-[100px]`}>{s.estado}</span>
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
          <div className="nk-card p-6 md:p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h5 className="font-black text-[#0da766] text-xl">#{selectedServicio.id?.slice(0, 8)}</h5>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <div className="space-y-3 text-sm mb-6 pb-6 border-b border-gray-100">
              <div><strong className="text-gray-500">Cliente:</strong> <span className="text-gray-800 font-medium">{selectedServicio.cliente_nombre}</span></div>
              <div><strong className="text-gray-500">Descripción:</strong>
                <p className="text-gray-800 mt-1 bg-gray-50 rounded-xl p-3 whitespace-pre-wrap max-h-40 overflow-y-auto">{selectedServicio.descripcion || "Sin descripción"}</p>
              </div>
              <div><strong className="text-gray-500">Estado actual:</strong> <span className={`status-badge ${badgeClass(selectedServicio.estado)}`}>{selectedServicio.estado}</span></div>
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
              <button
                onClick={() => { setModalOpen(false); router.push(`/dashboard/chat?servicio=${selectedServicio.id}`); }}
                className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-full font-bold text-sm hover:bg-blue-100 transition-colors"
              >
                💬 Chat
              </button>
              <button onClick={() => setModalOpen(false)} disabled={guardando} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors disabled:opacity-50">Cerrar</button>
              <button
                onClick={handleGuardarEstado}
                disabled={guardando || nuevoEstado === selectedServicio.estado}
                className="flex-1 py-3 bg-[#0da766] text-white rounded-full font-bold text-sm hover:bg-[#0a8752] transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {guardando && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {guardando ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} type={toastType} />}

      <p className="nk-footer-inline">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
