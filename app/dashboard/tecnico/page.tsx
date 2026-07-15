"use client";

import { useEffect, useState } from "react";

type Servicio = {
  id: string;
  descripcion: string;
  estado: string;
  fecha_creacion: string;
  cliente_nombre: string;
};

type Tecnico = {
  id: string;
  nombre: string;
};

export default function TecnicoDashboard() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [tecnico, setTecnico] = useState<Tecnico | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Servicio | null>(null);

  useEffect(() => {
    fetch('/api/perfil')
      .then(res => res.json())
      .then(async (data) => {
        if (data.data?.id) {
          setTecnico(data.data);
          const res = await fetch(`/api/servicios?tecnico_id=${data.data.id}`);
          const json = await res.json();
          setServicios(json.data || []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const asignados = servicios.length;
  const enProceso = servicios.filter(s => s.estado === 'En Proceso').length;
  const cerradosHoy = servicios.filter(s =>
    (s.estado === 'Finalizado' || s.estado === 'Completado') &&
    new Date(s.fecha_creacion).toDateString() === new Date().toDateString()
  ).length;

  const badgeClass = (estado: string) => {
    if (estado === 'Finalizado' || estado === 'Completado') return 'bg-[#0da766] text-white';
    if (estado === 'En Proceso') return 'bg-yellow-400 text-yellow-900';
    if (estado === 'Cancelado') return 'bg-red-500 text-white';
    return 'bg-gray-200 text-gray-700';
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500 font-medium">Cargando...</div>;
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
        <div className="text-center mb-7">
          <h2 className="text-2xl font-black text-gray-800 mb-1">¡Hola {tecnico?.nombre || 'Técnico'}! 👋</h2>
          <p className="text-gray-400 font-medium">Resumen de tu jornada</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Servicios Asignados", value: String(asignados), color: "text-gray-800" },
            { label: "En Proceso", value: String(enProceso), color: "text-[#0da766]" },
            { label: "Cerrados Hoy", value: String(cerradosHoy), color: "text-gray-800" },
          ].map((k, i) => (
            <div key={i} className={`rounded-xl p-5 text-center border ${i === 1 ? "border-green-100 bg-green-50" : "border-gray-100 bg-gray-50"}`}>
              <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${i === 1 ? "text-[#0da766]" : "text-gray-400"}`}>{k.label}</p>
              <p className={`text-4xl font-black ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h4 className="font-bold text-gray-600 text-sm uppercase tracking-wider mb-5">Próximos Servicios Asignados</h4>
        {servicios.length === 0 ? (
          <p className="text-center text-gray-400 py-6">No tienes servicios asignados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  {["ID Servicio", "Cliente", "Estado", "Acciones"].map((h, i) => (
                    <th key={i} className={`pb-3 text-xs font-bold uppercase tracking-wider text-gray-400 ${i === 3 ? "text-right" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {servicios.map((s, i) => (
                  <tr key={s.id || i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 pr-4"><span className="font-bold text-gray-500 text-sm">{s.id?.slice(0, 8)}</span></td>
                    <td className="py-4 pr-4">
                      <div className="font-bold text-gray-800 text-sm">{s.cliente_nombre}</div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`${badgeClass(s.estado)} text-xs font-bold px-3 py-1.5 rounded-full`}>{s.estado}</span>
                    </td>
                    <td className="py-4 text-right">
                      <button onClick={() => setSelected(s)} className="bg-[#0da766] text-white font-bold text-xs px-4 py-2 rounded-full hover:bg-[#0a8752] transition-colors shadow-sm">Ver Detalles</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-gray-800 text-lg">Servicio</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500 font-medium">Cliente:</span><span className="font-bold text-gray-800">{selected.cliente_nombre}</span></div>
              <div className="flex justify-between"><span className="text-gray-500 font-medium">Estado:</span><span className={`${badgeClass(selected.estado)} font-bold px-2 py-0.5 rounded-full text-xs`}>{selected.estado}</span></div>
            </div>
            <button onClick={() => setSelected(null)} className="mt-6 w-full bg-[#0da766] text-white font-bold py-3 rounded-xl hover:bg-[#0a8752] transition-colors">Cerrar</button>
          </div>
        </div>
      )}

      <p className="text-center text-gray-400 text-xs py-3">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
