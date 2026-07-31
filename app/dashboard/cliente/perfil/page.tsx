"use client";

import { useEffect, useState, useCallback } from "react";
import Toast from "@/app/components/Toast";

type PerfilData = {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
};

const TELEFONO_REGEX = /^[0-9+\-\s()]{7,20}$/;

export default function MiPerfilPage() {
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const loadPerfil = useCallback(() => {
    setLoadError(false);
    setPerfil(null);
    fetch('/api/perfil')
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setPerfil(data.data);
          setNombre(data.data.nombre || "");
          setTelefono(data.data.telefono || "");
          setDireccion(data.data.direccion || "");
        }
      })
      .catch(() => setLoadError(true));
    fetch('/api/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setPerfil(prev => prev || { nombre: "", email: data.user.email, telefono: "", direccion: "" });
        }
      })
      .catch(() => setLoadError(true));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { loadPerfil(); }, 0);
    return () => clearTimeout(timer);
  }, [loadPerfil]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (telefono && !TELEFONO_REGEX.test(telefono)) {
      setToast("El teléfono debe contener solo números (7 a 20 dígitos)");
      setToastType("error");
      setTimeout(() => setToast(""), 3000);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/perfil', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, telefono, direccion }),
      });
      if (res.ok) {
        setToast("¡Perfil actualizado exitosamente!");
        setToastType("success");
      } else {
        setToast("Error al actualizar perfil");
        setToastType("error");
      }
    } catch {
      setToast("Error de conexión");
      setToastType("error");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 3000);
    }
  };

  if (!perfil) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        {loadError ? (
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-3">No se pudo cargar tu perfil.</p>
            <button
              onClick={loadPerfil}
              className="px-5 py-2 bg-[#0da766] text-white rounded-full text-xs font-bold hover:bg-[#0a8752] transition-colors"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div className="w-8 h-8 border-4 border-[#0da766] border-t-transparent rounded-full animate-spin" />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h3 className="font-black text-[#0da766] text-2xl">Mi Perfil</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <div className="w-full h-full rounded-full bg-[#0da766] flex items-center justify-center text-4xl text-white overflow-hidden shadow-sm border-4 border-gray-50">
              {nombre ? nombre.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "👤"}
            </div>
          </div>

          <h4 className="font-bold text-xl text-gray-800 mb-1">{nombre || "Sin nombre"}</h4>
          <p className="text-[#0da766] font-bold text-sm mb-4">Cliente</p>

          <div className="w-full border-t border-gray-100 pt-4 text-left space-y-3">
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-8 text-[#0da766] text-lg">✉️</span>
              {perfil.email || "—"}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-8 text-[#0da766] text-lg">📞</span>
              {telefono || "—"}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-8 text-[#0da766] text-lg">📍</span>
              {direccion || "—"}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h5 className="font-bold text-lg text-gray-800 border-b border-gray-100 pb-4 mb-5">Actualizar Datos Personales</h5>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nombre Completo</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0da766]/30 focus:border-[#0da766]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Correo Electrónico</label>
                <input
                  type="email"
                  value={perfil.email || ""}
                  disabled
                  className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Teléfono Móvil</label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={e => setTelefono(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0da766]/30 focus:border-[#0da766]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Dirección</label>
                <input
                  type="text"
                  value={direccion}
                  onChange={e => setDireccion(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0da766]/30 focus:border-[#0da766]/30"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-full font-bold text-sm bg-[#0da766] text-white hover:bg-[#0a8752] transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
              >
                {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>

      {toast && <Toast message={toast} type={toastType} />}

      <p className="text-center text-gray-400 text-xs py-3">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
