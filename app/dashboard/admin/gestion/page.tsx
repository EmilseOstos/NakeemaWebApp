"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/Toast";

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
  cantidad?: number;
  costo?: number;
  tiempo?: number;
  notas_tecnicas?: string | null;
};

const ESTADOS = ["Pendiente", "En Proceso", "Finalizado", "Cancelado"];

const formatFecha = (fecha?: string) =>
  fecha ? new Date(fecha).toLocaleDateString("es-CO") : "—";

export default function GestionServiciosPage() {
  const router = useRouter();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("all");
  const [busqueda, setBusqueda] = useState("");
  const [selected, setSelected] = useState<Servicio | null>(null);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [acting, setActing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Servicio | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast(msg);
    setToastType(type);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchServicios = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/servicios');
      const data = await res.json();
      if (data.data) setServicios(data.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { fetchServicios(); }, 0);
    return () => clearTimeout(timer);
  }, [fetchServicios]);

  const filteredServicios = servicios.filter(s => {
    const matchEstado = filtroEstado === "all" || s.estado.toLowerCase() === filtroEstado.toLowerCase();
    const matchBusqueda = s.id.toLowerCase().includes(busqueda.toLowerCase()) || s.cliente_nombre.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchBusqueda;
  });

  const handleCambiarEstado = async (servicio: Servicio, nuevoEstado: string) => {
    if (nuevoEstado === servicio.estado) return;
    setActing(true);
    try {
      const res = await fetch('/api/servicios', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: servicio.id, estado: nuevoEstado }),
      });
      if (res.ok) {
        showToast(`Servicio #${servicio.id.slice(0, 8)} actualizado a "${nuevoEstado}"`);
        setSelected(null);
        fetchServicios();
      } else {
        showToast("Error al actualizar el servicio", "error");
      }
    } catch {
      showToast("Error de conexión", "error");
    } finally {
      setActing(false);
    }
  };

  const handleEliminar = async () => {
    if (!confirmDelete) return;
    setActing(true);
    try {
      const res = await fetch(`/api/servicios?id=${confirmDelete.id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast(`Servicio #${confirmDelete.id.slice(0, 8)} eliminado`);
        setServicios(prev => prev.filter(s => s.id !== confirmDelete.id));
        setConfirmDelete(null);
        if (selected?.id === confirmDelete.id) setSelected(null);
      } else {
        showToast("Error al eliminar el servicio", "error");
      }
    } catch {
      showToast("Error de conexión", "error");
    } finally {
      setActing(false);
    }
  };

  const badgeStyle = (estado: string) => {
    if (estado === "Finalizado" || estado === "Completado") return "bg-[#0da766] text-white";
    if (estado === "En Proceso") return "bg-yellow-400 text-yellow-900";
    if (estado === "Cancelado") return "bg-red-500 text-white";
    return "bg-gray-200 text-gray-700";
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h3 className="font-black text-[#0da766] text-2xl">Gestión de Servicios</h3>
      </div>

      {loading ? (
        <div className="nk-card p-10 flex justify-center">
          <div className="w-8 h-8 border-4 border-[#0da766] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="nk-card p-10 text-center">
          <p className="text-gray-500 font-medium mb-3">No se pudieron cargar los servicios.</p>
          <button
            onClick={fetchServicios}
            className="px-6 py-2.5 bg-[#0da766] text-white rounded-full font-bold text-sm hover:bg-[#0a8752] transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <div className="nk-card overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-wrap gap-4 justify-between items-center">
            <div className="relative flex-grow max-w-md">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Buscar servicio..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0da766]/30"
              />
            </div>
            <select
              value={filtroEstado}
              onChange={e => setFiltroEstado(e.target.value)}
              className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0da766]/30 appearance-none shadow-sm cursor-pointer"
            >
              <option value="all">Todos los Estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="en proceso">En Proceso</option>
              <option value="finalizado">Finalizado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="table-custom w-full text-sm text-center">
              <thead>
                <tr>
                  {["ID Servicio", "Cliente", "Técnico", "Fecha", "Estado", "Acciones"].map((h, i) => (
                    <th key={i} className={`py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider ${i === 1 ? "text-left" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredServicios.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">No se encontraron servicios.</td>
                  </tr>
                ) : (
                  filteredServicios.map((s, i) => (
                    <tr key={s.id || i}>
                      <td className="py-4 px-4 font-bold text-gray-500">{s.id?.slice(0, 8)}</td>
                      <td className="py-4 px-4 text-left font-medium text-gray-700">{s.cliente_nombre}</td>
                      <td className="py-4 px-4 text-gray-700">{s.tecnico_nombre}</td>
                      <td className="py-4 px-4 text-gray-400">{formatFecha(s.fecha_creacion)}</td>
                      <td className="py-4 px-4">
                        <span className={`status-badge ${badgeStyle(s.estado)}`}>
                          {s.estado}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelected(s)}
                            className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors"
                            aria-label={`Ver detalle del servicio ${s.id.slice(0, 8)}`}
                            title="Ver"
                          >👁️</button>
                          <button
                            onClick={() => setConfirmDelete(s)}
                            className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                            aria-label={`Eliminar servicio ${s.id.slice(0, 8)}`}
                            title="Eliminar"
                          >🗑️</button>
                        </div>
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
              <h3 className="font-black text-[#0da766] text-lg">Detalle del Servicio</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold w-8 h-8 flex items-center justify-center">✕</button>
            </div>
            <div className="space-y-3.5 text-sm">
              {[
                { label: "ID", value: selected.id?.slice(0, 8) },
                { label: "Cliente", value: selected.cliente_nombre },
                { label: "Técnico", value: selected.tecnico_nombre },
                { label: "Fecha", value: formatFecha(selected.fecha_creacion) },
                ...(selected.titulo ? [{ label: "Título", value: selected.titulo }] : []),
                ...(selected.categoria ? [{ label: "Categoría", value: selected.categoria }] : []),
                ...(selected.prioridad ? [{ label: "Prioridad", value: selected.prioridad }] : []),
                ...(selected.direccion ? [{ label: "Dirección", value: selected.direccion }] : []),
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="font-bold text-gray-500">{row.label}:</span>
                  <span className="text-gray-800 text-right">{row.value}</span>
                </div>
              ))}
              <div className="border-b border-gray-50 pb-2">
                <span className="font-bold text-gray-500">Descripción:</span>
                <p className="text-gray-800 mt-1.5 bg-gray-50 rounded-xl p-3 whitespace-pre-wrap max-h-48 overflow-y-auto">{selected.descripcion || "Sin descripción"}</p>
              </div>
              {selected.reporte_descripcion && (
                <div className="border-b border-gray-50 pb-2">
                  <span className="font-bold text-gray-500">Reporte del técnico:</span>
                  <p className="text-gray-800 mt-1.5 bg-green-50 rounded-xl p-3 whitespace-pre-wrap max-h-40 overflow-y-auto">{selected.reporte_descripcion}</p>
                  {(selected.cantidad || selected.costo || selected.tiempo) && (
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-600 font-medium">
                      {selected.cantidad ? <span>🔢 Cantidad: {selected.cantidad}</span> : null}
                      {selected.costo ? <span>💰 Costo: ${Number(selected.costo).toLocaleString("es-CO")}</span> : null}
                      {selected.tiempo ? <span>⏱️ Tiempo: {selected.tiempo} h</span> : null}
                    </div>
                  )}
                </div>
              )}
              {selected.notas_tecnicas && (
                <div className="border-b border-gray-50 pb-2">
                  <span className="font-bold text-gray-500">Notas técnicas:</span>
                  <p className="text-gray-800 mt-1.5 bg-yellow-50 rounded-xl p-3 whitespace-pre-wrap max-h-40 overflow-y-auto">{selected.notas_tecnicas}</p>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-500">Estado:</span>
                <span className={`status-badge ${badgeStyle(selected.estado)}`}>{selected.estado}</span>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Cambiar Estado</label>
                <div className="flex flex-wrap gap-2">
                  {ESTADOS.filter(e => e !== selected.estado).map(e => (
                    <button
                      key={e}
                      disabled={acting}
                      onClick={() => handleCambiarEstado(selected, e)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-[#0da766] hover:text-white text-gray-700 rounded-full text-xs font-bold transition-colors disabled:opacity-50"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => { setSelected(null); router.push(`/dashboard/chat?servicio=${selected.id}`); }}
              className="mt-6 w-full bg-[#0da766] text-white font-bold py-3 rounded-xl hover:bg-[#0a8752] transition-colors"
            >
              💬 Abrir Chat del Servicio
            </button>
            <button onClick={() => setSelected(null)} className="mt-2 w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => !acting && setConfirmDelete(null)}>
          <div className="nk-card p-8 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h3 className="font-black text-gray-800 text-lg mb-3">¿Eliminar este servicio?</h3>
            <p className="text-gray-500 text-sm mb-6">
              El servicio #{confirmDelete.id.slice(0, 8)} se eliminará permanentemente. Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                disabled={acting}
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminar}
                disabled={acting}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {acting ? "Eliminando..." : "Sí, eliminar"}
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
