"use client";

import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/dashboard/admin");
  const isTecnico = pathname.startsWith("/dashboard/tecnico");
  const isCliente = pathname.startsWith("/dashboard/cliente");

  const name = isAdmin ? "Administrador" : isTecnico ? "Kelly Ramirez" : "Emilse Ostos";
  const role = isAdmin ? "Administrador" : isTecnico ? "Técnico" : "Cliente";
  const initials = isAdmin ? "AD" : isTecnico ? "KR" : "EO";
  
  // Título según la ruta original
  const pageTitle = isTecnico 
    ? "Portal Técnico" 
    : isAdmin 
      ? "Portal Administrador" 
      : "Portal Cliente";

  return (
    <header className="flex justify-between items-center bg-transparent">
      {/* Izquierda: Título de página (en el diseño es texto limpio oscuro) */}
      <h1 className="text-xl font-black text-gray-800 tracking-tight">{pageTitle}</h1>

      {/* Derecha: Notificaciones y Perfil */}
      <div className="flex items-center gap-5">
        <button className="text-gray-400 hover:text-[#0da766] transition-colors relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-gray-200 pl-5">
          <div className="text-right">
            <div className="text-sm font-black text-gray-800 leading-none">{name}</div>
            <div className="text-xs text-gray-400 font-medium mt-1">{role}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-sm font-black text-gray-600">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
