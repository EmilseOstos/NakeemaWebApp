"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/Toast";

const AVATAR_COLORS = [
  "bg-[#0da766]", "bg-blue-500", "bg-purple-500", "bg-orange-500", "bg-red-500", "bg-indigo-500"
];

const getBadgeClass = (estado: string) => {
  if (estado === "Disponible") return "bg-green-100 text-green-700";
  if (estado === "Ocupado") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

type Tecnico = {
  id: string;
  nombre: string;
  especialidad: string;
  telefono: string;
  estado: string;
};

type Servicio = {
  id: string;
  descripcion: string;
  estado: string;
  cliente_nombre: string;
};

export default function TecnicosPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const [perfilTecnico, setPerfilTecnico] = useState<Tecnico | null>(null);
  const [asignarTecnico, setAsignarTecnico] = useState<Tecnico | null>(null);
  const [serviciosPendientes, setServiciosPendientes] = useState<Servicio[]>([]);
  const [servicioAsignar, setServicioAsignar] = useState("");
  const [asignando, setAsignando] = useState(false);

  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [estado, setEstado] = useState("Disponible");
  const [submitting, setSubmitting] = useState(false);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast(msg);
    setToastType(type);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchTecnicos = useCallback(async () => {
    try {
      const res = await fetch('/api/tecnicos');
      const data = await res.json();
      if (data.data) {
        setTecnicos(data.data);
      }
    } catch {
      showToast("No se pudieron cargar los técnicos", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { fetchTecnicos(); }, 0);
    return () => clearTimeout(timer);
  }, [fetchTecnicos]);

  const openAsignar = async (t: Tecnico) => {
    setAsignarTecnico(t);
    setServicioAsignar("");
    try {
      const res = await fetch('/api/servicios');
      const data = await res.json();
      const pendientes = (data.data || []).filter(
        (s: Servicio) => s.estado === 'Pendiente' || s.estado === 'En Proceso'
      );
      setServiciosPendientes(pendientes);
    } catch {
      setServiciosPendientes([]);
    }
  };

  const handleAsignar = async () => {
    if (!asignarTecnico || !servicioAsignar) return;
    setAsignando(true);
    try {
      const res = await fetch('/api/servicios', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: servicioAsignar, tecnico_id: asignarTecnico.id }),
      });
      if (res.ok) {
        showToast(`Servicio asignado a ${asignarTecnico.nombre}`);
        setAsignarTecnico(null);
        setServicioAsignar("");
      } else {
        showToast("Error al asignar el servicio", "error");
      }
    } catch {
      showToast("Error de conexión", "error");
    } finally {
      setAsignando(false);
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
        showToast("Técnico guardado exitosamente");
        setModalOpen(false);
        setNombre("");
        setEspecialidad("");
        setTelefono("");
        setEstado("Disponible");
        fetchTecnicos();
      } else {
        showToast("Error al guardar: " + (result.error || result.details), "error");
      }
    } catch {
      showToast("Error de conexión al servidor", "error");
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
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-[#0da766] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : tecnicos.length === 0 ? (
        <div className="text-center py-10 text-gray-500 font-medium">No hay técnicos registrados. Añade uno nuevo.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tecnicos.map((t, i) => (
            <div key={t.id || i} className="nk-card p-6 text-center relative flex flex-col h-full">
              <span className={`status-badge absolute top-4 right-4 ${getBadgeClass(t.estado)}`}>
                {t.estado}
              </span>

              <div className={`avatar-tech mx-auto text-3xl mb-4 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                {t.nombre?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "👤"}
              </div>

              <h5 className="font-bold text-lg text-gray-800 mb-1">{t.nombre}</h5>
              <p className="text-gray-500 text-sm mb-4 flex-grow">{t.especialidad}</p>

              <div className="flex justify-between items-center px-4 py-3 border-t border-gray-100 mt-auto text-sm">
                <div className="font-bold text-gray-600">📞 {t.telefono || "Sin teléfono"}</div>
              </div>

              <div className="flex gap-2 mt-4 pt-2">
                <button
                  onClick={() => setPerfilTecnico(t)}
                  className="flex-1 py-2 rounded-full font-bold text-sm border-2 border-gray-100 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Ver Perfil
                </button>
                {t.estado === "Disponible" ? (
                  <button
                    onClick={() => openAsignar(t)}
                    className="flex-1 py-2 rounded-full font-bold text-sm bg-[#0da766] text-white hover:bg-[#0a8752] transition-colors"
                  >
                    Asignar
                  </button>
                ) : t.estado === "Ocupado" ? (
                  <button
                    onClick={() => router.push("/dashboard/chat")}
                    className="flex-1 py-2 rounded-full font-bold text-sm bg-[#0da766] text-white hover:bg-[#0a8752] transition-colors"
                  >
                    Contactar
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/dashboard/chat")}
                    className="flex-1 py-2 rounded-full font-bold text-sm border-2 border-red-100 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Contactar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {perfilTecnico && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setPerfilTecnico(null)}>
          <div className="nk-card p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-black text-[#0da766] text-lg">Perfil del Técnico</h3>
              <button onClick={() => setPerfilTecnico(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold w-8 h-8 flex items-center justify-center">✕</button>
            </div>
            <div className="space-y-3.5 text-sm">
              {[
                { label: "Nombre", value: perfilTecnico.nombre },
                { label: "Especialidad", value: perfilTecnico.especialidad || "—" },
                { label: "Teléfono", value: perfilTecnico.telefono || "—" },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="font-bold text-gray-500">{row.label}:</span>
                  <span className="text-gray-800">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-500">Estado:</span>
                <span className={`status-badge ${getBadgeClass(perfilTecnico.estado)}`}>{perfilTecnico.estado}</span>
              </div>
            </div>
            <button onClick={() => setPerfilTecnico(null)} className="mt-6 w-full bg-[#0da766] text-white font-bold py-3 rounded-xl hover:bg-[#0a8752] transition-colors">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {asignarTecnico && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => !asignando && setAsignarTecnico(null)}>
          <div className="nk-card p-6 md:p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h5 className="font-black text-[#0da766] text-xl">Asignar Servicio</h5>
              <button onClick={() => !asignando && setAsignarTecnico(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Técnico: <strong className="text-gray-800">{asignarTecnico.nombre}</strong></p>

            {serviciosPendientes.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm bg-gray-50 rounded-xl">
                No hay servicios pendientes por asignar.
              </div>
            ) : (
              <select
                value={servicioAsignar}
                onChange={e => setServicioAsignar(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0da766]/30 mb-6"
              >
                <option value="">Seleccione un servicio...</option>
                {serviciosPendientes.map(s => (
                  <option key={s.id} value={s.id}>
                    #{s.id.slice(0, 8)} - {s.cliente_nombre} ({s.estado})
                  </option>
                ))}
              </select>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setAsignarTecnico(null)}
                disabled={asignando}
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleAsignar}
                disabled={asignando || !servicioAsignar}
                className="flex-1 py-3 bg-[#0da766] text-white rounded-xl font-bold text-sm hover:bg-[#0a8752] transition-colors disabled:opacity-50"
              >
                {asignando ? "Asignando..." : "Asignar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Añadir Técnico */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => !submitting && setModalOpen(false)}>
          <div className="nk-card p-6 md:p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
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

      {toast && <Toast message={toast} type={toastType} />}

      <p className="nk-footer-inline">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
