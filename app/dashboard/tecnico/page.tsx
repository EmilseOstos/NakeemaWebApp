"use client";

import { useState } from "react";

const SERVICIOS = [
  { id: "O.R.24567", priority: "Alta",  client: "Emilse Ostos",    zone: "Norte - Cedritos",   wa: "573201234567", map: "Norte+Cedritos+Bogota",    badge: "bg-red-100 text-red-600" },
  { id: "O.R.24568", priority: "Media", client: "Marcos Suarez",   zone: "Sur - Kennedy",      wa: "573156789012", map: "Sur+Kennedy+Bogota",        badge: "bg-yellow-100 text-yellow-700" },
  { id: "O.R.24569", priority: "Baja",  client: "Luis Muñoz",      zone: "Occidente - Fontibón", wa: "573189876543", map: "Occidente+Fontibon+Bogota", badge: "bg-gray-100 text-gray-600" },
  { id: "O.R.24570", priority: "Media", client: "Sonia Hernandez", zone: "Centro - Chapinero", wa: "573112345678", map: "Centro+Chapinero+Bogota",    badge: "bg-yellow-100 text-yellow-700" },
];

type Servicio = typeof SERVICIOS[0];

export default function TecnicoDashboard() {
  const [selected, setSelected] = useState<Servicio | null>(null);

  return (
    <div className="space-y-5">

      {/* Saludo + KPIs */}
      <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
        <div className="text-center mb-7">
          <h2 className="text-2xl font-black text-gray-800 mb-1">¡Hola Kelly! 👋</h2>
          <p className="text-gray-400 font-medium">Resumen de tu jornada</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Servicios Asignados", value: "5",  color: "text-gray-800" },
            { label: "En Proceso",           value: "2",  color: "text-[#0da766]" },
            { label: "Cerrados Hoy",         value: "8",  color: "text-gray-800" },
          ].map((k, i) => (
            <div key={i} className={`rounded-xl p-5 text-center border ${i === 1 ? "border-green-100 bg-green-50" : "border-gray-100 bg-gray-50"}`}>
              <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${i === 1 ? "text-[#0da766]" : "text-gray-400"}`}>{k.label}</p>
              <p className={`text-4xl font-black ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h4 className="font-bold text-gray-600 text-sm uppercase tracking-wider mb-5">Próximos Servicios Asignados</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                {["Id Servicio", "Prioridad", "Cliente", "Acciones"].map((h, i) => (
                  <th key={i} className={`pb-3 text-xs font-bold uppercase tracking-wider text-gray-400 ${i === 3 ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SERVICIOS.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-4">
                    <span className="font-bold text-gray-500 text-sm">{s.id}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className={`${s.badge} text-xs font-bold px-3 py-1.5 rounded-full`}>{s.priority}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="font-bold text-gray-800 text-sm">{s.client}</div>
                    <div className="text-gray-400 text-xs mt-0.5">📍 {s.zone}</div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <a href={`https://wa.me/${s.wa}`} target="_blank" rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-green-50 text-green-600 border border-green-100 flex items-center justify-center hover:bg-green-100 transition-colors text-sm" title="WhatsApp">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                        </svg>
                      </a>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${s.map}`} target="_blank" rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center hover:bg-blue-100 transition-colors" title="Ver en Mapa">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        </svg>
                      </a>
                      <button
                        onClick={() => setSelected(s)}
                        className="bg-[#0da766] text-white font-bold text-xs px-4 py-2 rounded-full hover:bg-[#0a8752] transition-colors shadow-sm"
                      >
                        Ver Detalles
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-gray-400 text-xs py-3">© 2026 Todos los derechos Reservados. Nakeema</p>

      {/* Modal Detalle */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-gray-800 text-lg">{selected.id}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500 font-medium">Cliente:</span><span className="font-bold text-gray-800">{selected.client}</span></div>
              <div className="flex justify-between"><span className="text-gray-500 font-medium">Zona:</span><span className="font-bold text-gray-800">{selected.zone}</span></div>
              <div className="flex justify-between"><span className="text-gray-500 font-medium">Prioridad:</span><span className={`${selected.badge} font-bold px-2 py-0.5 rounded-full text-xs`}>{selected.priority}</span></div>
              <div className="flex justify-between"><span className="text-gray-500 font-medium">Estado:</span><span className="bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded-full text-xs">En Proceso</span></div>
            </div>
            <button onClick={() => setSelected(null)} className="mt-6 w-full bg-[#0da766] text-white font-bold py-3 rounded-xl hover:bg-[#0a8752] transition-colors">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* FAB Chat */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-[#0da766] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0a8752] transition-colors z-40">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
        </svg>
      </button>
    </div>
  );
}
