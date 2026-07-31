"use client";

import { useEffect, useState } from "react";
import Toast from "@/app/components/Toast";

type InventarioItem = {
  id: string;
  nombre: string;
  cantidad: number;
  unidad_medida: string;
};

export default function SolicitarInsumosPage() {
  const [inventario, setInventario] = useState<InventarioItem[]>([]);
  const [itemId, setItemId] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cargandoInventario, setCargandoInventario] = useState(true);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    fetch('/api/inventario')
      .then(res => res.json())
      .then(data => setInventario(data.data || []))
      .catch(() => {})
      .finally(() => setCargandoInventario(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemId) {
      setToast("Selecciona un material");
      setToastType("error");
      setTimeout(() => setToast(""), 3000);
      return;
    }
    const item = inventario.find(i => i.id === itemId);
    if (item && cantidad > item.cantidad) {
      setToast(`Solo hay ${item.cantidad} ${item.unidad_medida} disponibles`);
      setToastType("error");
      setTimeout(() => setToast(""), 3000);
      return;
    }
    const confirmado = window.confirm(
      `¿Solicitar ${cantidad} ${item?.unidad_medida || ""} de "${item?.nombre || "este material"}"?\nEsto descontará el stock disponible.`
    );
    if (!confirmado) return;
    setLoading(true);
    try {
      const res = await fetch('/api/inventario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: itemId, cantidad_a_restar: cantidad }),
      });
      const data = await res.json();
      if (res.ok) {
        setToast(`Solicitud exitosa. Stock restante: ${data.data?.cantidad}`);
        setToastType("success");
        const r = await fetch('/api/inventario');
        const j = await r.json();
        setInventario(j.data || []);
        setItemId("");
        setCantidad(1);
      } else {
        setToast(data.error || "Error al solicitar material");
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

  const selectedItem = inventario.find(i => i.id === itemId);

  return (
    <div className="space-y-5">
      <h3 className="font-black text-[#0da766] text-2xl">Solicitar Materiales a Bodega</h3>

      <div className="max-w-3xl mx-auto">
        <div className="nk-card p-6 md:p-10">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-8">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Material</label>
                {cargandoInventario ? (
                  <div className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-400">Cargando inventario...</div>
                ) : inventario.length === 0 ? (
                  <div className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-400">
                    No hay materiales disponibles en bodega.
                  </div>
                ) : (
                  <select
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                    className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0da766]/30 font-bold text-gray-700 appearance-none"
                    required
                  >
                    <option value="">Seleccionar material...</option>
                    {inventario.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nombre} ({item.cantidad} {item.unidad_medida})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Cantidad</label>
                <input
                  type="number"
                  required
                  min="1"
                  max={selectedItem?.cantidad || 1}
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0da766]/30"
                />
              </div>

              <div className="md:col-span-12 pt-4 flex justify-center border-t border-gray-100 mt-2">
                <button
                  type="submit"
                  disabled={loading || inventario.length === 0}
                  className="px-8 py-3.5 bg-[#0da766] text-white rounded-full font-bold text-sm hover:bg-[#0a8752] transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
                  Solicitar Material
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {toast && <Toast message={toast} type={toastType} />}

      <p className="nk-footer-inline">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
