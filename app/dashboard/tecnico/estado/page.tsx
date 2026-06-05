"use client";

import { useState } from "react";

export default function ActualizarEstadoPage() {
  const [searchId, setSearchId] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("En Proceso");
  const [notas, setNotas] = useState("");

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando orden de servicio:", searchId);
  };

  const handleActualizar = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Actualizando estado:", {
      id: "#O.R.24567",
      estado: nuevoEstado,
      notas: notas,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 py-6">
      
      {/* Contenedor Principal Centrado */}
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 md:p-10 shadow-xs border border-slate-100">
        
        {/* Título del Panel */}
        <h2 className="text-xl md:text-2xl font-bold text-[#0da766] tracking-tight text-center mb-8">
          Actualizar Estado de Servicio
        </h2>

        {/* 1. Buscador de O.R. */}
        <form onSubmit={handleBuscar} className="space-y-2 mb-6">
          <label className="block text-xs font-bold text-slate-700 tracking-wide">
            Buscar O.R. / Servicio
          </label>
          <div className="flex gap-0 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 focus-within:border-[#0da766] focus-within:bg-white transition-colors">
            <input
              type="text"
              placeholder="Ingrese ID (Ej. #O.R.24567)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 bg-transparent px-4 py-3 text-sm text-slate-800 outline-hidden placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="bg-[#0da766] hover:bg-[#0a8752] text-white font-bold text-xs px-6 py-3 transition-colors shrink-0"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* 2. Información del Servicio Seleccionado */}
        <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-5 mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span className="text-xs font-bold text-slate-500 tracking-wide">
              Servicio Seleccionado:
            </span>
            <span className="font-black text-slate-800 text-sm sm:text-right">
              #O.R.24567 – Reparación Eléctrica
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-3 border-t border-slate-200/60">
            <span className="text-xs font-bold text-slate-500 tracking-wide">
              Estado Actual:
            </span>
            <span className="inline-block bg-amber-400 text-slate-900 text-[10px] font-black px-4 py-1 rounded-md uppercase tracking-wider shadow-2xs self-start sm:self-auto">
              En Proceso
            </span>
          </div>
        </div>

        {/* Formulario de Modificación */}
        <form onSubmit={handleActualizar} className="space-y-6">
          
          {/* 3. Selector de Nuevo Estado */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 tracking-wide">
              Nuevo Estado
            </label>
            <div className="relative">
              <select
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm appearance-none focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors text-slate-800 font-medium"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Completado">Completado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
              {/* Flecha del select */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 4. Notas Técnicas */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 tracking-wide">
              Notas Técnicas <span className="text-slate-400 font-normal">(Visibles internamente)</span>
            </label>
            <textarea
              rows={4}
              placeholder="Escriba los detalles de la actualización, hallazgos o recomendaciones..."
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-hidden focus:border-[#0da766] focus:bg-white transition-colors resize-none placeholder:text-slate-400 text-slate-800"
            />
          </div>

          {/* 5. Botón de Actualizar Servicio con Degradado */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#5cb85c] to-[#00796b] hover:from-[#4cae4c] hover:to-[#004d40] text-white font-bold text-sm px-10 py-3 rounded-xl shadow-md transition-all transform hover:scale-[1.01] active:scale-[0.99]"
            >
              Actualizar Servicio
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}