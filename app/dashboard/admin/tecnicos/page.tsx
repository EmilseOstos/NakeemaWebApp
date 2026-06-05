"use client";

import { useState, useEffect } from "react";

// Colores disponibles para los avatares
const AVATAR_COLORS = [
  "bg-[#0da766]", "bg-blue-500", "bg-purple-500", "bg-orange-500", "bg-red-500", "bg-indigo-500"
];

// Helper para obtener clase de estado
const getBadgeClass = (estado: string) => {
  if (estado === "Disponible") return "bg-green-100 text-green-700";
  if (estado === "Ocupado") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

export default function TecnicosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tecnicos, setTecnicos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [estado, setEstado] = useState("Disponible");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTecnicos();
  }, []);

  const fetchTecnicos = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/tecnicos');
      const data = await res.json();
      if (data.data) {
        setTecnicos(data.data);
      }
    } catch (error) {
      console.error("Error fetching tecnicos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const res = await fetch('/api/tecnicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, especialidad, telefono, estado })
      });
      
      const result = await res.json();
      
      if (res.ok) {
        alert("Técnico guardado exitosamente");
        setModalOpen(false);
        // Reset form
        setNombre("");
        setEspecialidad("");
        setTelefono("");
        setEstado("Disponible");
        // Refrescar lista
        fetchTecnicos();
      } else {
        alert("Error al guardar: " + (result.error || result.details));
      }
    } catch (error) {
      console.error("Error saving tecnico:", error);
      alert("Error de conexión al servidor");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h3 className="font-black text-[#0da766] text-2xl">Directorio de Técnicos</h3>
        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-2.5 bg-[#0da766] text-white rounded-full font-bold text-sm hover:bg-[#0a8752] transition-colors flex items-center gap-2 shadow-sm"
        >
          <span className="text-lg leading-none">+</span> Nuevo Técnico
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500 font-medium">Cargando técnicos...</div>
      ) : tecnicos.length === 0 ? (
        <div className="text-center py-10 text-gray-500 font-medium">No hay técnicos registrados. Añade uno nuevo.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tecnicos.map((t, i) => (
            <div key={t.id || i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center relative flex flex-col h-full hover:shadow-md transition-shadow">
              <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${getBadgeClass(t.estado)}`}>
                {t.estado}
              </span>
              
              <div className={`w-20 h-20 mx-auto rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} text-white flex items-center justify-center text-3xl mb-4 shadow-sm border-4 border-white ring-1 ring-gray-100`}>
                👤
              </div>
              
              <h5 className="font-bold text-lg text-gray-800 mb-1">{t.nombre}</h5>
              <p className="text-gray-500 text-sm mb-4 flex-grow">{t.especialidad}</p>
              
              <div className="flex justify-between items-center px-4 py-3 border-t border-gray-100 mt-auto text-sm">
                <div className="font-bold text-gray-600"><span className="text-yellow-400">★</span> 5.0/5</div>
                <div className="font-bold text-gray-600">🔧 0 Serv.</div>
              </div>
              
              <div className="flex gap-2 mt-4 pt-2">
                <button className="flex-1 py-2 rounded-full font-bold text-sm border-2 border-gray-100 text-gray-600 hover:bg-gray-50 transition-colors">
                  Ver Perfil
                </button>
                {t.estado === "Disponible" ? (
                  <button className="flex-1 py-2 rounded-full font-bold text-sm bg-[#0da766] text-white hover:bg-[#0a8752] transition-colors">
                    Asignar
                  </button>
                ) : t.estado === "Ocupado" ? (
                  <button className="flex-1 py-2 rounded-full font-bold text-sm bg-gray-100 text-gray-400 cursor-not-allowed">
                    Ocupado
                  </button>
                ) : (
                  <button className="flex-1 py-2 rounded-full font-bold text-sm border-2 border-red-100 text-red-500 hover:bg-red-50 transition-colors">
                    Contactar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Añadir Técnico */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => !submitting && setModalOpen(false)}>
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h5 className="font-black text-[#0da766] text-xl">Registrar Nuevo Técnico</h5>
              <button onClick={() => !submitting && setModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  className="w-full bg-gray-50 border-0 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0da766]/30" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Especialidad</label>
                <select 
                  required 
                  value={especialidad}
                  onChange={e => setEspecialidad(e.target.value)}
                  className="w-full bg-gray-50 border-0 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0da766]/30"
                >
                  <option value="">Seleccione...</option>
                  <option value="Especialista Eléctrico">Especialista Eléctrico</option>
                  <option value="Mecánico General">Mecánico General</option>
                  <option value="Soporte Técnico Nivel 2">Soporte Técnico Nivel 2</option>
                  <option value="Técnico de Redes">Técnico de Redes</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Teléfono</label>
                  <input 
                    type="tel" 
                    required 
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                    className="w-full bg-gray-50 border-0 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0da766]/30" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Estado</label>
                  <select 
                    value={estado}
                    onChange={e => setEstado(e.target.value)}
                    className="w-full bg-gray-50 border-0 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0da766]/30"
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Ocupado">Ocupado</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full mt-4 bg-[#0da766] text-white font-bold py-3 rounded-xl hover:bg-[#0a8752] transition-colors disabled:opacity-70"
              >
                {submitting ? "Guardando..." : "Guardar Técnico"}
              </button>
            </form>
          </div>
        </div>
      )}

      <p className="text-center text-gray-400 text-xs py-3">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
