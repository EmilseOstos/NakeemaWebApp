'use client';

import { useState, useEffect } from 'react';

type Cliente = {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  estado: string;
};

export default function ClientesPage() {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', direccion: '' });
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingTabla, setLoadingTabla] = useState(true);
  const [tempPassword, setTempPassword] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data.data || []))
      .catch(() => {})
      .finally(() => setLoadingTabla(false));
  }, []);

  const handleCopyPassword = async () => {
    if (!tempPassword) return;
    try {
      await navigator.clipboard.writeText(tempPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('No se pudo copiar. Copia manualmente la contraseña.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setTempPassword('');
    try {
      const res = await fetch('/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        const password = data.data?.tempPassword || '';
        setTempPassword(password);
        setSuccess(`Cliente creado. Comparte la contraseña temporal con el cliente.`);
        setClientes(prev => [...prev, { id: data.data.id, nombre: data.data.nombre, email: formData.email, telefono: data.data.telefono || '', estado: data.data.estado || 'Activo' }]);
        setFormData({ nombre: '', email: '', telefono: '', direccion: '' });
      } else {
        setError(data.error || 'Error al crear cliente');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess('');
        setTempPassword('');
        setCopied(false);
      }, 15000);
    }
  };

  return (
    <div className="space-y-5">
        <div className="flex justify-between items-center nk-card p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Registro de Clientes</h1>
            <p className="text-gray-500 mt-1">Ingresa los datos del nuevo cliente en el sistema.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 nk-card p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm font-medium">{error}</div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-r-lg text-sm font-medium">
                {success}
                {tempPassword && (
                  <div className="mt-3 bg-white rounded-xl p-4 border border-green-200">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <p className="text-xs font-bold text-green-800 uppercase tracking-wide mb-1">Contraseña temporal del cliente</p>
                        <p className="font-mono text-lg font-bold text-gray-800 select-all break-all">{tempPassword}</p>
                        <p className="text-xs text-gray-500 mt-1">Compártela con el cliente y pídele que la cambie al iniciar sesión.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyPassword}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        {copied ? "✓ Copiada" : "📋 Copiar"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input type="text" required data-testid="cliente-nombre" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="Ej. Juan Pérez" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input type="email" required data-testid="cliente-email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="juan@ejemplo.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input type="text" required data-testid="cliente-telefono" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="300 000 0000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <input type="text" value={formData.direccion} onChange={e => setFormData({...formData, direccion: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="Dirección (opcional)" />
              </div>
              <div className="pt-4">
                <button type="submit" data-testid="btn-guardar-cliente" disabled={loading} className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-70">
                  {loading ? 'Guardando...' : 'Guardar Registro'}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-3 nk-card p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Clientes Registrados</h2>
            <div className="overflow-x-auto">
              <table className="table-custom w-full text-left">
                <thead>
                  <tr className="text-gray-600 text-sm">
                    <th className="py-3 px-4 font-medium">Nombre</th>
                    <th className="py-3 px-4 font-medium">Email</th>
                    <th className="py-3 px-4 font-medium">Teléfono</th>
                    <th className="py-3 px-4 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingTabla ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center">
                        <div className="w-8 h-8 border-4 border-[#0da766] border-t-transparent rounded-full animate-spin mx-auto" />
                      </td>
                    </tr>
                  ) : clientes.length > 0 ? (
                    clientes.map(c => (
                      <tr key={c.id}>
                        <td className="py-4 px-4 text-gray-800 font-medium">{c.nombre}</td>
                        <td className="py-4 px-4 text-gray-500 text-sm">{c.email}</td>
                        <td className="py-4 px-4 text-gray-500 text-sm">{c.telefono}</td>
                        <td className="py-4 px-4">
                          <span className={`status-badge ${c.estado === 'Activo' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>{c.estado}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-400">No hay clientes registrados</td>
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
