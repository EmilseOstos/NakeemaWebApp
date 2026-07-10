'use client';

import { useState } from 'react';

export default function ProveedoresPage() {
  const [search, setSearch] = useState('');
  const [proveedores] = useState([
    { id: 1, nombre: 'Distribuidora Tecnológica S.A.', insumo: 'Procesadores Intel', contacto: '3001234567' },
    { id: 2, nombre: 'Componentes Globales', insumo: 'Tarjetas Madre ASUS', contacto: '3109876543' },
    { id: 3, nombre: 'Soluciones IT', insumo: 'Discos Duros SSD', contacto: '3156789012' },
    { id: 4, nombre: 'Importadora Electronica', insumo: 'Memorias RAM Corsair', contacto: '3205557777' },
  ]);

  const [formData, setFormData] = useState({ nombre: '', insumo: '', contacto: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.insumo || !formData.contacto) {
      setError('Error: Todos los campos son obligatorios para registrar el proveedor.');
      return;
    }
    setError('');
    // Mock save
    alert('Proveedor guardado correctamente');
  };

  const filteredProveedores = proveedores.filter(p => 
    p.nombre.toLowerCase().includes(search.toLowerCase()) || 
    p.insumo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Gestión de Proveedores</h1>
            <p className="text-gray-500 mt-1">Administra los proveedores y consulta los insumos disponibles.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de Registro */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Registrar Proveedor</h2>
            
            {error && (
              <div data-testid="error-alert" className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm font-medium animate-pulse">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Proveedor</label>
                <input 
                  type="text" 
                  name="nombre"
                  data-testid="input-nombre"
                  value={formData.nombre}
                  onChange={e => setFormData({...formData, nombre: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="Ej. Distribuidora XYZ"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insumo Principal</label>
                <input 
                  type="text" 
                  name="insumo"
                  data-testid="input-insumo"
                  value={formData.insumo}
                  onChange={e => setFormData({...formData, insumo: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="Ej. Memorias RAM"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contacto</label>
                <input 
                  type="text" 
                  name="contacto"
                  data-testid="input-contacto"
                  value={formData.contacto}
                  onChange={e => setFormData({...formData, contacto: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="Teléfono o Email"
                />
              </div>
              <button 
                type="submit" 
                data-testid="btn-guardar"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                Registrar
              </button>
            </form>
          </div>

          {/* Tabla de Consulta */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Directorio de Insumos</h2>
              <div className="relative w-full sm:w-72">
                <input 
                  type="text"
                  data-testid="search-insumos"
                  placeholder="Buscar proveedor o insumo..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left" data-testid="tabla-proveedores">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                    <th className="py-3 px-4 rounded-tl-xl font-medium">Proveedor</th>
                    <th className="py-3 px-4 font-medium">Insumo</th>
                    <th className="py-3 px-4 rounded-tr-xl font-medium">Contacto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredProveedores.length > 0 ? (
                    filteredProveedores.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-4 text-gray-800 font-medium">{p.nombre}</td>
                        <td className="py-4 px-4 text-gray-600">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            {p.insumo}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-500 text-sm">{p.contacto}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-gray-400">No se encontraron resultados</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
