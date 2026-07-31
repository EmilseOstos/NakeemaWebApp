'use client';

import { useState, useEffect } from 'react';

type Proveedor = {
  id: string;
  nombre: string;
  insumo: string;
  contacto: string;
};

export default function ProveedoresPage() {
  const [search, setSearch] = useState('');
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [formData, setFormData] = useState({ nombre: '', insumo: '', contacto: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingTabla, setLoadingTabla] = useState(true);
  const [errorTabla, setErrorTabla] = useState('');

  const cargarProveedores = () => {
    setLoadingTabla(true);
    setErrorTabla('');
    fetch('/api/proveedores')
      .then(res => res.json())
      .then(data => {
        if (data.error) setErrorTabla(data.error);
        else setProveedores(data.data || []);
      })
      .catch(() => setErrorTabla('Error de conexión con el servidor.'))
      .finally(() => setLoadingTabla(false));
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.insumo || !formData.contacto) {
      setError('Todos los campos son obligatorios para registrar el proveedor.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/proveedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Proveedor guardado correctamente');
        setProveedores(prev => [...prev, data.data]);
        setFormData({ nombre: '', insumo: '', contacto: '' });
      } else {
        setError(data.error || 'Error al guardar');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const filteredProveedores = proveedores.filter(p => 
    p.nombre.toLowerCase().includes(search.toLowerCase()) || 
    p.insumo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
        
        <div className="flex justify-between items-center nk-card p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Gestión de Proveedores</h1>
            <p className="text-gray-500 mt-1">Administra los proveedores y consulta los insumos disponibles.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 nk-card p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Registrar Proveedor</h2>
            
            {error && (
              <div data-testid="error-alert" className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm font-medium">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-r-lg text-sm font-medium">
                {success}
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0da766]/20 focus:border-[#0da766] transition-all outline-none"
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0da766]/20 focus:border-[#0da766] transition-all outline-none"
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0da766]/20 focus:border-[#0da766] transition-all outline-none"
                  placeholder="Teléfono o Email"
                />
              </div>
              <button 
                type="submit" 
                data-testid="btn-guardar"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#0da766] hover:bg-[#0a8752] text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-70"
              >
                {loading ? 'Guardando...' : 'Registrar'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 nk-card p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Directorio de Insumos</h2>
              <div className="relative w-full sm:w-72">
                <input 
                  type="text"
                  data-testid="search-insumos"
                  placeholder="Buscar proveedor o insumo..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0da766]/20 focus:bg-white transition-all outline-none"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table-custom w-full text-left" data-testid="tabla-proveedores">
                <thead>
                  <tr className="text-gray-600 text-sm">
                    <th className="py-3 px-4 rounded-tl-xl font-medium">Proveedor</th>
                    <th className="py-3 px-4 font-medium">Insumo</th>
                    <th className="py-3 px-4 rounded-tr-xl font-medium">Contacto</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingTabla ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center">
                        <div className="w-8 h-8 border-4 border-[#0da766] border-t-transparent rounded-full animate-spin mx-auto" />
                      </td>
                    </tr>
                  ) : errorTabla ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center">
                        <p className="text-red-500 text-sm font-medium mb-3">{errorTabla}</p>
                        <button
                          onClick={cargarProveedores}
                          className="px-4 py-2 bg-[#0da766] text-white rounded-full text-xs font-bold hover:bg-[#0a8752] transition-colors"
                        >
                          Reintentar
                        </button>
                      </td>
                    </tr>
                  ) : filteredProveedores.length > 0 ? (
                    filteredProveedores.map(p => (
                      <tr key={p.id}>
                        <td className="py-4 px-4 text-gray-800 font-medium">{p.nombre}</td>
                        <td className="py-4 px-4 text-gray-600">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#d8f3e5] text-[#0a8451]">
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
  );
}
