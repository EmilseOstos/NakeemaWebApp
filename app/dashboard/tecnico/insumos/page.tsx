"use client";

import { useState } from "react";

export default function SolicitarInsumosPage() {
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setToast("Solicitud enviada a bodega exitosamente");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setToast(""), 3000);
    }, 800);
  };

  return (
    <div className="space-y-5">
      <h3 className="font-black text-[#0da766] text-2xl">Solicitar Materiales a Bodega</h3>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              
              <div className="md:col-span-8">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nombre del Material o Herramienta</label>
                <input type="text" required placeholder="Ej. Rollo de Cable 12AWG" className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0da766]/30" />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Cantidad Necesaria</label>
                <input type="number" required defaultValue="1" min="1" className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0da766]/30" />
              </div>

              <div className="md:col-span-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Servicio Asociado (Opcional)</label>
                <select className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0da766]/30 appearance-none font-bold text-gray-700">
                  <option value="">Ninguno / Uso General</option>
                  <option value="#O.R.24567">#O.R.24567 - Reparación Eléctrica</option>
                </select>
              </div>

              <div className="md:col-span-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nivel de Urgencia</label>
                <select className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-300 appearance-none font-bold text-red-500">
                  <option value="Normal" className="text-gray-800">Normal (Bodega general)</option>
                  <option value="Urgente">Urgente (Detiene el servicio actual)</option>
                </select>
              </div>

              <div className="md:col-span-12">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Justificación de la Solicitud</label>
                <textarea rows={3} placeholder="Explique brevemente por qué requiere estos materiales..." className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0da766]/30 resize-none"></textarea>
              </div>

              <div className="md:col-span-12 pt-4 flex justify-center border-t border-gray-100 mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-[#0da766] text-white rounded-full font-bold text-sm hover:bg-[#0a8752] transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70"
                >
                  {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
                  Enviar Solicitud a Bodega
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl z-50">
          {toast}
        </div>
      )}

      <p className="text-center text-gray-400 text-xs py-3">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
