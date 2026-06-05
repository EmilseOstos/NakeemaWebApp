"use client";

import { useState } from "react";

const SERVICIOS = [
  { id: "#O.R.24567", tipo: "Reparación Eléctrica",    fecha: "28 Mar 2026", tecnico: "Kelly Ramirez", estado: "En Proceso", badgeBg: "bg-yellow-400", badgeText: "text-yellow-900" },
  { id: "#O.R.24501", tipo: "Mantenimiento Preventivo", fecha: "15 Mar 2026", tecnico: "Carlos Roa",    estado: "Finalizado", badgeBg: "bg-[#0da766]",  badgeText: "text-white"     },
  { id: "#O.R.24489", tipo: "Falla de Red Externa",     fecha: "02 Mar 2026", tecnico: "Sin Asignar",   estado: "Cancelado",  badgeBg: "bg-red-500",    badgeText: "text-white"     },
];

type Servicio = typeof SERVICIOS[0];

export default function ServiciosActivosPage() {
  const [selected, setSelected] = useState<Servicio | null>(null);

  return (
    <div className="space-y-5">
      <h3 className="font-black text-[#0da766] text-2xl">Mis Solicitudes de Servicio</h3>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["ID Servicio", "Tipo de Servicio", "Fecha de Solicitud", "Técnico Asignado", "Estado", "Detalles"].map((h, i) => (
                  <th key={i} className={`py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider ${i === 1 ? "text-left" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SERVICIOS.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-bold text-gray-500">{s.id}</td>
                  <td className="py-4 px-4 text-left font-medium text-gray-700">{s.tipo}</td>
                  <td className="py-4 px-4 text-gray-400">{s.fecha}</td>
                  <td className="py-4 px-4 text-gray-700">{s.tecnico}</td>
                  <td className="py-4 px-4">
                    <span className={`${s.badgeBg} ${s.badgeText} text-xs font-bold px-4 py-1.5 rounded-full`}>
                      {s.estado}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => setSelected(s)}
                      className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto hover:bg-blue-100 transition-colors"
                    >
                      👁️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detalle */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-black text-[#0da766] text-lg">{selected.id}</h3>
                <p className="text-gray-500 text-sm mt-0.5">{selected.tipo}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold w-8 h-8 flex items-center justify-center">✕</button>
            </div>
            <div className="space-y-3.5 text-sm">
              {[
                { label: "ID", value: selected.id },
                { label: "Tipo", value: selected.tipo },
                { label: "Fecha", value: selected.fecha },
                { label: "Técnico", value: selected.tecnico },
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
