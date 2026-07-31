'use client';

import { useState } from 'react';
import Toast from '@/app/components/Toast';

export default function RegistrarServicio() {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast(msg);
    setToastType(type);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/servicios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          categoria,
          prioridad,
          direccion,
          descripcion
        })
      });

      const data = await response.json();

      if (response.ok) {
        showToast('Solicitud registrada exitosamente');
        setTitulo('');
        setCategoria('');
        setPrioridad('');
        setDireccion('');
        setDescripcion('');
      } else {
        showToast(`Error al registrar: ${data.error || 'Ocurrió un problema'}`, 'error');
      }
    } catch {
      showToast('Error de conexión al servidor', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setTitulo('');
    setCategoria('');
    setPrioridad('');
    setDireccion('');
    setDescripcion('');
  };

  return (
    <div className="w-full space-y-5">
        
        {/* CONTENIDO PRINCIPAL ALINEADO */}
        <div className="w-full space-y-8 flex-1 max-w-7xl mx-auto">
        
        {/* Título de la Sección Directo (Sin la barra superior de "Portal Cliente") */}
        <div className="pt-2">
          <h2 className="text-[26px] font-bold text-[#0da766] tracking-tight">
            Registrar Nuevo Servicio
          </h2>
        </div>

        {/* Tarjeta Contenedora Limpia con Bordes Sutiles y Alineación Perfecta */}
        <div className="nk-card p-10 w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo: Título */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Título del Problema / Servicio
              </label>
              <input
                type="text"
                placeholder="Ej. Falla en el sistema eléctrico principal"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#f4f6f8] text-slate-700 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 border border-transparent transition-all text-sm"
              />
            </div>

            {/* Fila: Categoría y Prioridad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Categoría */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Categoría del Servicio
                </label>
                <div className="relative">
                  <select
                    value={categoria}
                    required
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#f4f6f8] text-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 border border-transparent appearance-none transition-all text-sm cursor-pointer"
                  >
                    <option value="">Seleccionar categoría...</option>
                    <option value="Electrico">Eléctrico</option>
                    <option value="Plomeria">Plomería</option>
                    <option value="Mantenimiento">Mantenimiento General</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Prioridad */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Nivel de Prioridad
                </label>
                <div className="relative">
                  <select
                    value={prioridad}
                    required
                    onChange={(e) => setPrioridad(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#f4f6f8] text-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 border border-transparent appearance-none transition-all text-sm cursor-pointer"
                  >
                    <option value="">Seleccionar prioridad...</option>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </div>

            </div>

            {/* Campo: Dirección de Atención */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Dirección de Atención
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Ej. Calle 45 #12-34, Barrio Centro"
                  required
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#f4f6f8] text-slate-700 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 border border-transparent transition-all text-sm"
                />
              </div>
            </div>

            {/* Campo: Descripción Detallada */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Descripción Detallada
              </label>
              <textarea
                rows={5}
                placeholder="Describe los detalles del problema, síntomas que presenta o requerimientos específicos..."
                required
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#f4f6f8] text-slate-700 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 border border-transparent transition-all text-sm resize-none"
              />
            </div>

            {/* Botones Centrados Redondeados */}
            <div className="flex items-center justify-center gap-6 pt-6">
              <button
                type="button"
                disabled={loading}
                className="w-48 py-3 bg-[#6c757d] hover:bg-[#5a6268] text-white font-medium rounded-full shadow-sm transition-all text-sm text-center disabled:opacity-50"
                onClick={handleCancelar}
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-48 py-3 bg-gradient-to-r from-[#5cb85c] to-[#00693e] text-white font-medium rounded-full shadow-sm hover:opacity-95 active:scale-[0.99] transition-all text-sm text-center flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {loading ? "Registrando..." : "Registrar Solicitud"}
              </button>
            </div>

          </form>
        </div>
      </div>

      {toast && <Toast message={toast} type={toastType} />}

      {/* PIE DE PÁGINA */}
      <div className="nk-footer-inline">
        © 2026 Todos los derechos Reservados. Nakeema
      </div>

    </div>
  );
}