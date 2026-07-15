"use client";

import { useState, useEffect } from "react";

type Servicio = {
  id: string;
  descripcion: string;
  estado: string;
  fecha_creacion: string;
  cliente_nombre: string;
  tecnico_nombre: string;
};

export default function GestionServiciosPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState("all");
  const [busqueda, setBusqueda] = useState("");
  const [selected, setSelected] = useState<Servicio | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchServicios = async () => {
    try {
      const res = await fetch('/api/servicios');
      const data = await res.json();
      if (data.data) setServicios(data.data);
    } catch (error) {
      console.error("Error fetching servicios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchServicios(), 0);
    return () => clearTimeout(timer);
  }, []);

  const filteredServicios = servicios.filter(s => {
    const matchEstado = filtroEstado === "all" || s.estado.toLowerCase() === filtroEstado.toLowerCase();
    const matchBusqueda = s.id.toLowerCase().includes(busqueda.toLowerCase()) || s.cliente_nombre.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchBusqueda;
  });

  const badgeStyle = (estado: string) => {
    if (estado === "Finalizado" || estado === "Completado") return "bg-[#0da766] text-white";
    if (estado === "En Proceso") return "bg-yellow-400 text-yellow-900";
    if (estado === "Cancelado") return "bg-red-500 text-white";
    return "bg-gray-200 text-gray-700";
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h3 className="font-black text-[#0da766] text-2xl">Gestión de Servicios</h3>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500 font-medium">Cargando servicios...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-wrap gap-4 justify-between items-center">
            <div className="relative flex-grow max-w-md">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Buscar servicio..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0da766]/30"
              />
            </div>
            <select
              value={filtroEstado}
              onChange={e => setFiltroEstado(e.target.value)}
              className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0da766]/30 appearance-none shadow-sm cursor-pointer"
            >
              <option value="all">Todos los Estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="en proceso">En Proceso</option>
              <option value="finalizado">Finalizado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["ID Servicio", "Cliente", "Técnico", "Fecha", "Estado", "Acciones"].map((h, i) => (
                    <th key={i} className={`py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider ${i === 1 ? "text-left" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredServicios.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">No se encontraron servicios.</td>
                  </tr>
                ) : (
                  filteredServicios.map((s, i) => (
                    <tr key={s.id || i} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-bold text-gray-500">{s.id?.slice(0, 8)}</td>
                      <td className="py-4 px-4 text-left font-medium text-gray-700">{s.cliente_nombre}</td>
                      <td className="py-4 px-4 text-gray-700">{s.tecnico_nombre}</td>
                      <td className="py-4 px-4 text-gray-400">{new Date(s.fecha_creacion).toLocaleDateString()}</td>
                      <td className="py-4 px-4">
                        <span className={`${badgeStyle(s.estado)} text-xs font-bold px-4 py-1.5 rounded-full inline-block min-w-[100px]`}>
                          {s.estado}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button onClick={() => setSelected(s)} className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto hover:bg-blue-100 transition-colors" title="Ver">👁️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-black text-[#0da766] text-lg">Detalle del Servicio</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold w-8 h-8 flex items-center justify-center">✕</button>
            </div>
            <div className="space-y-3.5 text-sm">
              {[
                { label: "ID", value: selected.id?.slice(0, 8) },
                { label: "Cliente", value: selected.cliente_nombre },
                { label: "Técnico", value: selected.tecnico_nombre },
                { label: "Fecha", value: new Date(selected.fecha_creacion).toLocaleDateString() },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="font-bold text-gray-500">{row.label}:</span>
                  <span className="text-gray-800">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-500">Estado:</span>
                <span className={`${badgeStyle(selected.estado)} text-xs font-bold px-3 py-1 rounded-full`}>{selected.estado}</span>
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="mt-6 w-full bg-[#0da766] text-white font-bold py-3 rounded-xl hover:bg-[#0a8752] transition-colors">
              Cerrar
            </button>
          </div>
        </div>
      )}

      <p className="text-center text-gray-400 text-xs py-3">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
