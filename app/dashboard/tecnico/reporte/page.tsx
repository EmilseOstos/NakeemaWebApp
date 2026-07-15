"use client";

import { useEffect, useState } from "react";

export default function InsertarRegistroPage() {
  const [servicios, setServicios] = useState<{ id: string; descripcion: string }[]>([]);
  const [servicioId, setServicioId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [costo, setCosto] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetch('/api/perfil')
      .then(res => res.json())
      .then(async (data) => {
        if (data.data?.id) {
          const res = await fetch(`/api/servicios?tecnico_id=${data.data.id}`);
          const json = await res.json();
          setServicios((json.data || []).map((s: Record<string, unknown>) => ({ id: s.id as string, descripcion: s.descripcion as string })));
        }
      })
      .catch(() => {});
  }, []);

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!servicioId) {
      setToast("Selecciona un servicio");
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
          estado: 'Finalizado',
        }),
      });
      if (res.ok) {
        setToast("Reporte guardado y servicio finalizado");
        handleLimpiar();
      } else {
        setToast("Error al guardar el reporte");
      }
    } catch {
      setToast("Error de conexión");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 3000);
    }
  };

  const handleLimpiar = () => {
    setServicioId("");
    setDescripcion("");
    setCantidad("1");
    setCosto("");
    setTiempo("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 py-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 md:p-10 shadow-xs border border-slate-100">
        <h2 className="text-xl md:text-2xl font-bold text-[#0da766] tracking-tight text-center mb-8">Insertar Registro en Servicio</h2>

        <form onSubmit={handleGuardar} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 tracking-wide">ID del Servicio</label>
            <select
              value={servicioId}
              onChange={(e) => setServicioId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm appearance-none focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors text-slate-800 font-medium"
              required
            >
              <option value="" disabled hidden>Seleccionar servicio activo...</option>
              {servicios.map((s) => (
                <option key={s.id} value={s.id}>#{s.id?.slice(0, 8)}</option>
              ))}
            </select>
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight pb-2 border-b border-slate-200">Detalles del Registro</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2 md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 tracking-wide">Descripción</label>
              <input type="text" placeholder="Ej. Cambio de cableado principal" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors text-slate-800" required />
            </div>
            <div className="space-y-2 md:col-span-1">
              <label className="block text-xs font-bold text-slate-700 tracking-wide">Cantidad</label>
              <input type="number" min="1" value={cantidad} onChange={(e) => setCantidad(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors text-slate-800" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 tracking-wide">Costo Estimado ($)</label>
              <input type="text" placeholder="0.00" value={costo} onChange={(e) => setCosto(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors text-slate-800" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 tracking-wide">Tiempo (Horas)</label>
              <input type="text" placeholder="Ej. 2.5" value={tiempo} onChange={(e) => setTiempo(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors text-slate-800" required />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button type="button" onClick={handleLimpiar} className="w-full sm:w-auto min-w-[140px] bg-slate-500 hover:bg-slate-600 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-xs transition-colors">Limpiar</button>
            <button type="submit" disabled={loading} className="w-full sm:w-auto min-w-[180px] bg-gradient-to-r from-[#5cb85c] to-[#00796b] hover:from-[#4cae4c] hover:to-[#004d40] text-white font-bold text-xs px-8 py-3 rounded-xl shadow-md transition-all disabled:opacity-70">
              {loading ? "Guardando..." : "Guardar Registro"}
            </button>
          </div>
        </form>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl z-50">{toast}</div>
      )}
    </div>
  );
}
