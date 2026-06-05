"use client";

import { useState, useRef, useEffect } from "react";

export default function ConfiguracionPage() {
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check initial dark mode state
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setToast("Configuración guardada exitosamente");
      setLoading(false);
      setTimeout(() => setToast(""), 3000);
    }, 800);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setToast("La imagen es muy grande. Máximo 2MB.");
        setTimeout(() => setToast(""), 3000);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header section */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-[#0da766] text-2xl tracking-tight">Configuración del Sistema</h3>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-5 py-2.5 bg-[#0da766] text-white rounded-xl font-bold text-sm hover:bg-[#0a8752] transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70"
        >
          {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
          )}
          Guardar Cambios
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Columna Izquierda (Logo y Estilos) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Logo Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
            <input 
              type="file" 
              accept="image/png, image/jpeg" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageUpload}
            />
            <div 
              className="w-32 h-32 mx-auto mb-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                </svg>
              )}
            </div>
            <h5 className="font-bold text-[15px] text-gray-800 mb-1">Logo de la Empresa</h5>
            <p className="text-gray-400 text-[11px] font-medium mb-6">Formato PNG o JPG. Max 2MB.</p>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 rounded-full font-bold text-sm border-2 border-[#0da766] text-[#0da766] hover:bg-[#0da766] hover:text-white transition-colors"
            >
              Subir Imagen
            </button>
          </div>

          {/* Estilos Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h5 className="font-bold text-lg text-gray-800 border-b border-gray-100 pb-3 mb-4">Estilos</h5>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-600 text-sm flex items-center gap-2"><span>🌙</span> Modo Oscuro</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
                <div className="w-11 h-6 bg-blue-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Columna Derecha (Formulario) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <form onSubmit={handleSave}>
              <h5 className="font-bold text-lg text-gray-800 border-b border-gray-100 pb-3 mb-6">Información General</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">Nombre de la Empresa</label>
                  <input type="text" defaultValue="Nakeema Corp" className="w-full bg-[#f8f9fa] border-0 rounded-lg px-4 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-[#0da766]/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">Correo de Contacto</label>
                  <input type="email" defaultValue="admin@nakeema.com" className="w-full bg-[#f8f9fa] border-0 rounded-lg px-4 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-[#0da766]/30 transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">Dirección Principal</label>
                  <input type="text" defaultValue="Calle Falsa 123, Ciudad de México" className="w-full bg-[#f8f9fa] border-0 rounded-lg px-4 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-[#0da766]/30 transition-colors" />
                </div>
              </div>

              <h5 className="font-bold text-lg text-gray-800 border-b border-gray-100 pb-3 mb-6">Preferencias del Sistema</h5>
              <div className="space-y-5">
                <label className="flex items-center cursor-pointer">
                  <div className="relative inline-flex items-center">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </div>
                  <span className="ml-4 font-bold text-gray-600 text-sm">Enviar notificaciones por correo a los técnicos</span>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <div className="relative inline-flex items-center">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </div>
                  <span className="ml-4 font-bold text-gray-600 text-sm">Habilitar alertas SMS para servicios de alta prioridad</span>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <div className="relative inline-flex items-center">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </div>
                  <span className="ml-4 font-bold text-gray-600 text-sm">Auto-asignar servicios según disponibilidad técnica</span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-20 right-6 bg-[#0da766] text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl z-50 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {toast}
        </div>
      )}

      <p className="text-center text-gray-400 text-[11px] font-medium pt-4 pb-2">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
