"use client";

import { useEffect, useState } from "react";
import Toast from "@/app/components/Toast";

export default function ActualizarEstadoPage() {
  const [servicios, setServicios] = useState<{ id: string; descripcion: string; estado: string }[]>([]);
  const [servicioId, setServicioId] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("En Proceso");
  const [notas, setNotas] = useState("");
  const [loading, setLoading] = useState(false);
  const [cargandoServicios, setCargandoServicios] = useState(true);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    fetch('/api/perfil')
      .then(res => res.json())
      .then(async (data) => {
        if (data.data?.id) {
          const res = await fetch(`/api/servicios?tecnico_id=${data.data.id}`);
          const json = await res.json();
          setServicios((json.data || []).map((s: Record<string, unknown>) => ({ id: s.id as string, descripcion: s.descripcion as string, estado: s.estado as string })));
        }
      })
      .catch(() => {})
      .finally(() => setCargandoServicios(false));
  }, []);

  const selectedServicio = servicios.find(s => s.id === servicioId);

  const handleActualizar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!servicioId) {
      setToast("Selecciona un servicio primero");
      setToastType("error");
      setTimeout(() => setToast(""), 3000);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/servicios', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: servicioId,
          estado: nuevoEstado,
          notas_tecnicas: notas.trim() || null,
        }),
      });
      if (res.ok) {
        setToast(`Servicio actualizado a "${nuevoEstado}"`);
        setToastType("success");
        setNotas("");
        const data = await fetch(`/api/perfil`).then(r => r.json());
        if (data.data?.id) {
          const r = await fetch(`/api/servicios?tecnico_id=${data.data.id}`);
          const j = await r.json();
          setServicios((j.data || []).map((s: Record<string, unknown>) => ({ id: s.id as string, descripcion: s.descripcion as string, estado: s.estado as string })));
        }
      } else {
        setToast("Error al actualizar estado");
        setToastType("error");
      }
    } catch {
      setToast("Error de conexión");
      setToastType("error");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 py-6">
      <div className="nk-card w-full max-w-2xl p-6 md:p-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#0da766] tracking-tight text-center mb-8">Actualizar Estado de Servicio</h2>

        <div className="space-y-2 mb-6">
          <label className="block text-xs font-bold text-slate-700 tracking-wide">Seleccionar Servicio</label>
          {cargandoServicios ? (
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-400">Cargando servicios...</div>
          ) : servicios.length === 0 ? (
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-400">
              No tienes servicios asignados.
            </div>
          ) : (
            <select
              value={servicioId}
              onChange={(e) => { setServicioId(e.target.value); setNuevoEstado("En Proceso"); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm appearance-none focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors text-slate-800 font-medium"
            >
              <option value="" disabled hidden>Seleccionar servicio...</option>
              {servicios.map((s) => (
                <option key={s.id} value={s.id}>#{s.id?.slice(0, 8)}</option>
              ))}
            </select>
          )}
        </div>

        {selectedServicio && (
          <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-5 mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <span className="text-xs font-bold text-slate-500 tracking-wide">Servicio Seleccionado:</span>
              <span className="font-black text-slate-800 text-sm sm:text-right">#{selectedServicio.id?.slice(0, 8)}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-3 border-t border-slate-200/60">
              <span className="text-xs font-bold text-slate-500 tracking-wide">Estado Actual:</span>
              <span className="inline-block bg-amber-400 text-slate-900 text-[10px] font-black px-4 py-1 rounded-md uppercase tracking-wider shadow-2xs self-start sm:self-auto">{selectedServicio.estado}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleActualizar} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 tracking-wide">Nuevo Estado</label>
            <select value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm appearance-none focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors text-slate-800 font-medium">
              <option value="Pendiente">Pendiente</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 tracking-wide">Notas Técnicas</label>
            <textarea rows={4} placeholder="Escriba los detalles..." value={notas} onChange={(e) => setNotas(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors resize-none placeholder:text-slate-400 text-slate-800" />
          </div>

          <div className="flex justify-center pt-2">
            <button type="submit" disabled={loading || servicios.length === 0} className="bg-gradient-to-r from-[#5cb85c] to-[#00796b] hover:from-[#4cae4c] hover:to-[#004d40] text-white font-bold text-sm px-10 py-3 rounded-xl shadow-md transition-all disabled:opacity-70 flex items-center gap-2">
              {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {loading ? "Actualizando..." : "Actualizar Servicio"}
            </button>
          </div>
        </form>
      </div>

      {toast && <Toast message={toast} type={toastType} />}
    </div>
  );
}
