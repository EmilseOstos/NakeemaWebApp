"use client";

import { useState } from "react";

export default function MiPerfilPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setToast("¡Perfil actualizado exitosamente!");
      setLoading(false);
      setTimeout(() => setToast(""), 3000);
    }, 800);
  };

  return (
    <div className="space-y-5">
      <h3 className="font-black text-[#0da766] text-2xl">Mi Perfil</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Columna Izquierda: Info Resumen */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <div
              className="w-full h-full rounded-full bg-[#0da766] flex items-center justify-center text-4xl text-white overflow-hidden shadow-sm border-4 border-gray-50"
              style={avatar ? { backgroundImage: `url(${avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
              {!avatar && "👤"}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-50 border border-gray-100 transition-colors"
            >
              📷
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>
          
          <h4 className="font-bold text-xl text-gray-800 mb-1">Emilse Ostos</h4>
          <p className="text-[#0da766] font-bold text-sm mb-4 flex items-center justify-center gap-1">
            Cliente Premium <span className="text-[#0da766]">✓</span>
          </p>

          <div className="w-full border-t border-gray-100 pt-4 text-left space-y-3">
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-8 text-[#0da766] text-lg">✉️</span>
              emilse.ostos@gmail.com
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-8 text-[#0da766] text-lg">📞</span>
              +57 320 123 4567
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-8 text-[#0da766] text-lg">📍</span>
              Bogotá, Colombia
            </div>
          </div>
        </div>

        {/* Columna Derecha: Formulario */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h5 className="font-bold text-lg text-gray-800 border-b border-gray-100 pb-4 mb-5">Actualizar Datos Personales</h5>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nombre Completo</label>
                <input
                  type="text"
                  defaultValue="Emilse Ostos"
                  className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0da766]/30 focus:border-[#0da766]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Documento de Identidad</label>
                <input
                  type="text"
                  defaultValue="CC 1.020.345.678"
                  disabled
                  className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Correo Electrónico</label>
                <input
                  type="email"
                  defaultValue="emilse.ostos@gmail.com"
                  className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0da766]/30 focus:border-[#0da766]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Teléfono Móvil</label>
                <input
                  type="tel"
                  defaultValue="+57 320 123 4567"
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

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl z-50">
          {toast}
        </div>
      )}

      <p className="text-center text-gray-400 text-xs py-3">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}