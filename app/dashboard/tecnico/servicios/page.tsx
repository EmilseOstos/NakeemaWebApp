"use client";

import { useState } from "react";

export default function MisServiciosPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-5">
      <h3 className="font-black text-[#0da766] text-2xl">Mis Servicios Asignados</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-yellow-400 flex justify-between items-center">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Servicios Activos</div>
            <div className="text-3xl font-black text-gray-800">3</div>
          </div>
          <span className="text-4xl opacity-30">🔧</span>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-[#0da766] flex justify-between items-center">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Completados Hoy</div>
            <div className="text-3xl font-black text-gray-800">2</div>
          </div>
          <span className="text-4xl opacity-30 text-[#0da766]">✓</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <div className="font-bold text-gray-500">Lista de Tareas Pendientes</div>
          <button className="px-4 py-1.5 rounded-full text-xs font-bold border border-gray-200 text-gray-500 bg-white hover:bg-gray-50 transition-colors flex items-center gap-1">
            <span>↻</span> Actualizar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="bg-white border-b border-gray-100">
              <tr>
                {["ID / Tipo", "Cliente", "Dirección", "Prioridad", "Estado", "Acción"].map((h, i) => (
                  <th key={i} className={`py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider ${i === 0 ? "text-left" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 text-left">
                  <div className="font-black text-gray-800">#O.R.24567</div>
                  <div className="text-gray-500 text-xs font-bold mt-0.5">Reparación Eléctrica</div>
                </td>
                <td className="py-4 px-4 font-bold text-gray-700">Emilse Ostos</td>
                <td className="py-4 px-4 text-gray-500 text-xs">Av. Principal 456<br/>Piso 3, Of. 302</td>
                <td className="py-4 px-4">
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Alta</span>
                </td>
                <td className="py-4 px-4">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full inline-block w-full max-w-[100px]">En Proceso</span>
                </td>
                <td className="py-4 px-4">
                  <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-[#0da766] text-white rounded-full font-bold text-xs hover:bg-[#0a8752] transition-colors">
                    Gestionar
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 text-left">
                  <div className="font-black text-gray-800">#O.R.24602</div>
                  <div className="text-gray-500 text-xs font-bold mt-0.5">Revisión General</div>
                </td>
                <td className="py-4 px-4 font-bold text-gray-700">Corp. Innova</td>
                <td className="py-4 px-4 text-gray-500 text-xs">Av. Norte 102<br/>Bodega B</td>
                <td className="py-4 px-4">
                  <span className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full">Media</span>
                </td>
                <td className="py-4 px-4">
                  <span className="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full inline-block w-full max-w-[100px]">Pendiente</span>
                </td>
                <td className="py-4 px-4">
                  <button className="px-4 py-2 bg-[#0da766] text-white rounded-full font-bold text-xs hover:bg-[#0a8752] transition-colors">
                    Iniciar Tarea
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Gestionar */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h5 className="font-black text-[#0da766] text-xl">#O.R.24567 - Reparación Eléctrica</h5>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            
            <div className="space-y-3 text-sm mb-6 pb-6 border-b border-gray-100">
              <div><strong className="text-gray-500">Cliente:</strong> <span className="text-gray-800 font-medium">Emilse Ostos</span></div>
              <div><strong className="text-gray-500">Dirección:</strong> <span className="text-gray-800 font-medium">Av. Principal 456, Piso 3, Of. 302</span></div>
              <div><strong className="text-gray-500">Prioridad:</strong> <span className="text-red-500 font-bold">Alta</span></div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Cambiar Estado</label>
                <select className="w-full bg-gray-50 border-0 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-[#0da766]/30">
                  <option>En Proceso</option>
                  <option>Esperando Repuestos</option>
                  <option>Finalizado</option>
                  <option>Cancelado</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Agregar Nota</label>
                <textarea rows={2} placeholder="Nota adicional..." className="w-full bg-gray-50 border-0 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0da766]/30 resize-none"></textarea>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
                Cerrar
              </button>
              <button onClick={() => { setModalOpen(false); alert("Cambios guardados"); }} className="flex-1 py-3 bg-[#0da766] text-white rounded-full font-bold text-sm hover:bg-[#0a8752] transition-colors shadow-sm">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-gray-400 text-xs py-3">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
