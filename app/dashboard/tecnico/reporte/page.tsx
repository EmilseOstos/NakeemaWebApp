"use client";

import { useState } from "react";

export default function InsertarRegistroPage() {
  const [servicio, setServicio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [costo, setCosto] = useState("");
  const [tiempo, setTiempo] = useState("");

  const handleLimpiar = () => {
    setServicio("");
    setDescripcion("");
    setCantidad("1");
    setCosto("");
    setTiempo("");
  };

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Guardando registro técnico:", {
      servicio,
      descripcion,
      cantidad,
      costo: costo || "0.00",
      tiempo,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 py-6">
      
      {/* Contenedor Principal Centrado */}
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 md:p-10 shadow-xs border border-slate-100">
        
        {/* Título de la Pestaña */}
        <h2 className="text-xl md:text-2xl font-bold text-[#0da766] tracking-tight text-center mb-8">
          Insertar Registro en Servicio
        </h2>

        <form onSubmit={handleGuardar} className="space-y-6">
          
          {/* 1. Selector de Orden de Trabajo */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 tracking-wide">
              ID del Servicio / Orden de Trabajo
            </label>
            <div className="relative">
              <select
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm appearance-none focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors text-slate-800 font-medium"
                required
              >
                <option value="" disabled hidden>Seleccionar servicio activo...</option>
                <option value="OR24567">#O.R.24567 – Reparación Eléctrica</option>
                <option value="OR24602">#O.R.24602 – Revisión General</option>
              </select>
              {/* Flecha personalizada */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Subtítulo / Separador de Sección */}
          <div className="pt-2">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight pb-2 border-b border-slate-200">
              Detalles del Registro
            </h3>
          </div>

          {/* 2. Fila: Descripción y Cantidad */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2 md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 tracking-wide">
                Descripción (Repuesto / Acción)
              </label>
              <input
                type="text"
                placeholder="Ej. Cambio de cableado principal"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors text-slate-800"
                required
              />
            </div>
            
            <div className="space-y-2 md:col-span-1">
              <label className="block text-xs font-bold text-slate-700 tracking-wide">
                Cantidad
              </label>
              <input
                type="number"
                min="1"
                placeholder="1"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors text-slate-800"
                required
              />
            </div>
          </div>

          {/* 3. Fila: Costo Estimado y Tiempo Invertido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 tracking-wide">
                Costo Estimado ($)
              </label>
              <input
                type="text"
                placeholder="0.00"
                value={costo}
                onChange={(e) => setCosto(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors text-slate-800"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 tracking-wide">
                Tiempo Invertido (Horas)
              </label>
              <input
                type="text"
                placeholder="Ej. 2.5"
                value={tiempo}
                onChange={(e) => setTiempo(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors text-slate-800"
                required
              />
            </div>
          </div>

          {/* 4. Bloque de Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleLimpiar}
              className="w-full sm:w-auto min-w-[140px] bg-slate-500 hover:bg-slate-600 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-xs transition-colors"
            >
              Limpiar
            </button>
            
            <button
              type="submit"
              className="w-full sm:w-auto min-w-[180px] bg-gradient-to-r from-[#5cb85c] to-[#00796b] hover:from-[#4cae4c] hover:to-[#004d40] text-white font-bold text-xs px-8 py-3 rounded-xl shadow-md transition-all transform hover:scale-[1.01] active:scale-[0.99]"
            >
              Guardar Registro
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}