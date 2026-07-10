'use client';

import { useState } from 'react';

export default function ClientesPage() {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '' });
  
  // Intencionalmente no tenemos estado de éxito claro, solo limpiamos el formulario
  // para mostrar el detalle por mejorar que pide la evidencia.

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos un guardado silencioso sin feedback visual claro
    setTimeout(() => {
      setFormData({ nombre: '', email: '', telefono: '' });
    }, 500);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-2">Registro de Clientes</h1>
          <p className="text-gray-500 mb-8">Ingresa los datos del nuevo cliente en el sistema.</p>
          
          {/* El botón de cancelar falta a propósito para evidenciar mejoras de UI */}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
              <input 
                type="text" 
                required
                data-testid="cliente-nombre"
                value={formData.nombre}
                onChange={e => setFormData({...formData, nombre: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                placeholder="Ej. Juan Pérez"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                required
                data-testid="cliente-email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                placeholder="juan@ejemplo.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input 
                type="text" 
                required
                data-testid="cliente-telefono"
                value={formData.telefono}
                onChange={e => setFormData({...formData, telefono: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                placeholder="300 000 0000"
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                data-testid="btn-guardar-cliente"
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                Guardar Registro
              </button>
            </div>
          </form>
        </div>
        
        {/* Un pequeño aviso abajo para mostrar que es intencional para las pruebas */}
        <p className="text-xs text-gray-400 mt-6 text-center">
          * Interfaz en versión Alpha. Faltan mensajes de éxito y botones de control.
        </p>

      </div>
    </div>
  );
}
