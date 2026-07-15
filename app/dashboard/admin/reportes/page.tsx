"use client";

import { useEffect, useState } from "react";

type Servicio = {
  id: string;
  descripcion: string;
  estado: string;
  fecha_creacion: string;
  cliente_nombre: string;
  tecnico_nombre: string;
};

export default function ReportesPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState("all");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  useEffect(() => {
    fetch('/api/servicios')
      .then(res => res.json())
      .then(data => {
        setServicios(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = servicios.filter(s => {
    if (filtroEstado !== "all" && s.estado !== filtroEstado) return false;
    if (fechaInicio && s.fecha_creacion && s.fecha_creacion < fechaInicio) return false;
    if (fechaFin && s.fecha_creacion && s.fecha_creacion > fechaFin + "T23:59:59") return false;
    return true;
  });

  const completados = servicios.filter(s => s.estado === "Finalizado" || s.estado === "Completado").length;
  const pendientes = servicios.filter(s => s.estado === "Pendiente").length;
  const enProceso = servicios.filter(s => s.estado === "En Proceso").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Centro de Reportes</h1>
          <p className="text-gray-500 mt-1">Descarga y analiza los datos de la plataforma.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm mb-1">Completados</p>
          <p className="text-3xl font-black text-[#0da766]">{completados}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm mb-1">En Proceso</p>
          <p className="text-3xl font-black text-yellow-500">{enProceso}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm mb-1">Pendientes</p>
          <p className="text-3xl font-black text-red-500">{pendientes}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            value={filtroEstado}
            onChange={e => setFiltroEstado(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm"
          >
            <option value="all">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          <input
            type="date"
            value={fechaInicio}
            onChange={e => setFechaInicio(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm"
            placeholder="Fecha inicio"
          />
          <input
            type="date"
            value={fechaFin}
            onChange={e => setFechaFin(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm"
            placeholder="Fecha fin"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#0da766] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No hay servicios que coincidan con los filtros
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                  <th className="py-3 px-4 font-medium">ID</th>
                  <th className="py-3 px-4 font-medium">Cliente</th>
                  <th className="py-3 px-4 font-medium">Técnico</th>
                  <th className="py-3 px-4 font-medium">Estado</th>
                  <th className="py-3 px-4 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(s => (
                  <tr key={s.id} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4 text-xs text-gray-500 font-mono">#{s.id.slice(0, 8)}</td>
                    <td className="py-3 px-4 text-gray-800 font-medium">{s.cliente_nombre}</td>
                    <td className="py-3 px-4 text-gray-600">{s.tecnico_nombre}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        s.estado === "Finalizado" || s.estado === "Completado" ? "bg-green-50 text-green-700" :
                        s.estado === "En Proceso" ? "bg-yellow-50 text-yellow-700" :
                        s.estado === "Cancelado" ? "bg-red-50 text-red-700" :
                        "bg-gray-50 text-gray-600"
                      }`}>{s.estado}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-sm">{s.fecha_creacion?.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
