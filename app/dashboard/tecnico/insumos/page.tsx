"use client";

import { useEffect, useState } from "react";

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
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetch('/api/inventario')
      .then(res => res.json())
      .then(data => setInventario(data.data || []))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemId) {
      setToast("Selecciona un material");
      setTimeout(() => setToast(""), 3000);
      return;
    }
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
        const r = await fetch('/api/inventario');
        const j = await r.json();
        setInventario(j.data || []);
      } else {
        setToast(data.error || "Error al solicitar material");
      }
    } catch {
      setToast("Error de conexión");
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
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-8">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Material</label>
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
                  disabled={loading}
                  className="px-8 py-3.5 bg-[#0da766] text-white rounded-full font-bold text-sm hover:bg-[#0a8752] transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70"
                >
                  {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
                  Solicitar Material
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl z-50">{toast}</div>
      )}

      <p className="text-center text-gray-400 text-xs py-3">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
