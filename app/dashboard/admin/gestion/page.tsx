"use client";

import { useState } from "react";

const SERVICIOS_INICIALES = [
  { id: "#O.R.24567", cliente: "Emilse Ostos", tecnico: "Kelly Ramirez", fecha: "28 Mar 2026", estado: "En Proceso", badgeBg: "bg-yellow-400", badgeText: "text-yellow-900" },
  { id: "#O.R.24501", cliente: "Juan Perez", tecnico: "Carlos Roa", fecha: "15 Mar 2026", estado: "Finalizado", badgeBg: "bg-[#0da766]", badgeText: "text-white" },
  { id: "#O.R.24489", cliente: "Maria Gomez", tecnico: "Sin Asignar", fecha: "02 Mar 2026", estado: "Cancelado", badgeBg: "bg-red-500", badgeText: "text-white" },
];

export default function GestionServiciosPage() {
  const [servicios] = useState(SERVICIOS_INICIALES);
  const [filtroEstado, setFiltroEstado] = useState("all");
  const [busqueda, setBusqueda] = useState("");
  type Servicio = typeof SERVICIOS_INICIALES[0];
  const [selected, setSelected] = useState<Servicio | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredServicios = servicios.filter(s => {
    const matchEstado = filtroEstado === "all" || s.estado.toLowerCase() === filtroEstado.toLowerCase();
    const matchBusqueda = s.id.toLowerCase().includes(busqueda.toLowerCase()) || s.cliente.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchBusqueda;
  });

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h3 className="font-black text-[#0da766] text-2xl">Gestión de Servicios</h3>
        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-2.5 bg-[#0da766] text-white rounded-full font-bold text-sm hover:bg-[#0a8752] transition-colors flex items-center gap-2 shadow-sm"
        >
          <span className="text-lg leading-none">+</span> Añadir Servicio
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Barra superior de tabla */}
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
            <option value="en proceso">En Proceso</option>
            <option value="pendiente">Pendiente</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["ID Servicio", "Cliente", "Técnico Asignado", "Fecha", "Estado", "Acciones"].map((h, i) => (
                  <th key={i} className={`py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider ${i === 1 ? "text-left" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredServicios.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-bold text-gray-500">{s.id}</td>
                  <td className="py-4 px-4 text-left font-medium text-gray-700">{s.cliente}</td>
                  <td className="py-4 px-4 text-gray-700">{s.tecnico}</td>
                  <td className="py-4 px-4 text-gray-400">{s.fecha}</td>
                  <td className="py-4 px-4">
                    <span className={`${s.badgeBg} ${s.badgeText} text-xs font-bold px-4 py-1.5 rounded-full inline-block min-w-[100px]`}>
                      {s.estado}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => setSelected(s)} className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors" title="Ver">👁️</button>
                      <button className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors" title="Editar">✏️</button>
                      <button className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors" title="Eliminar">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredServicios.length === 0 && (
            <div className="p-8 text-center text-gray-400">No se encontraron servicios.</div>
          )}
        </div>
      </div>

      {/* Modal Añadir */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h5 className="font-black text-[#0da766] text-xl">Añadir Nuevo Servicio</h5>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <form onSubmit={e => { e.preventDefault(); setModalOpen(false); alert("Servicio guardado exitosamente"); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Cliente</label>
                <input type="text" required className="w-full bg-gray-50 border-0 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0da766]/30" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Tipo de Servicio</label>
                <select required className="w-full bg-gray-50 border-0 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0da766]/30">
                  <option value="">Seleccione...</option>
                  <option>Mantenimiento Preventivo</option>
                  <option>Reparación Eléctrica</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Técnico Asignado</label>
                <select className="w-full bg-gray-50 border-0 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0da766]/30">
                  <option>Sin asignar</option>
                  <option>Kelly Ramirez</option>
                  <option>Carlos Roa</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Dirección</label>
                <input type="text" className="w-full bg-gray-50 border-0 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0da766]/30" />
              </div>
              <button type="submit" className="w-full mt-2 bg-[#0da766] text-white font-bold py-3 rounded-xl hover:bg-[#0a8752] transition-colors">
                Guardar Servicio
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Ver */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-black text-[#0da766] text-lg">{selected.id} - Detalle</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold w-8 h-8 flex items-center justify-center">✕</button>
            </div>
            <div className="space-y-3.5 text-sm">
              {[
                { label: "Cliente", value: selected.cliente },
                { label: "Técnico", value: selected.tecnico },
                { label: "Fecha", value: selected.fecha },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="font-bold text-gray-500">{row.label}:</span>
                  <span className="text-gray-800">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-500">Estado:</span>
                <span className={`${selected.badgeBg} ${selected.badgeText} text-xs font-bold px-3 py-1 rounded-full`}>{selected.estado}</span>
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
