"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// ==========================================
// 1. DECLARACIÓN DE ICONOS SIMILARES AL ORIGINAL
// ==========================================
function IconLightning() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function IconPlusCircle() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

function IconBox() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
      <path d="M12 2l9 4.5v11L12 22l-9-4.5v-11L12 2zm0 2.236l-6.528 3.264L12 10.764l6.528-3.264L12 4.236zM3.5 9.472v8.292L11 21.514v-8.292L3.5 9.472zm17 0l-7.5 3.75v8.292l7.5-3.75V9.472z"/>
    </svg>
  );
}

function IconSearch() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
  );
}

// ==========================================
// 2. MENÚS SEGÚN IMAGEN
// ==========================================
type MenuItem = { label: string; href: string; icon: React.ReactNode };

const MENUS: Record<string, MenuItem[]> = {
  tecnico: [
    { label: "Dashboard", href: "/dashboard/tecnico", icon: <IconLightning /> },
    { label: "Nuevo Reporte", href: "/dashboard/tecnico/reporte", icon: <IconPlusCircle /> },
    { label: "Actualizar Estado", href: "/dashboard/tecnico/estado", icon: <IconRefresh /> },
    { label: "Solicitar", href: "/dashboard/tecnico/insumos", icon: <IconBox /> },
    { label: "Consultar", href: "/dashboard/tecnico/servicios", icon: <IconSearch /> },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard/admin", icon: <IconLightning /> },
    { label: "Gestión", href: "/dashboard/admin/gestion", icon: <IconPlusCircle /> },
    { label: "Proveedores", href: "/dashboard/admin/proveedores", icon: <IconBox /> },
    { label: "Clientes", href: "/dashboard/admin/clientes", icon: <IconSearch /> },
    { label: "Reportes", href: "/dashboard/admin/reportes", icon: <IconBox /> },
    { label: "Técnicos", href: "/dashboard/admin/tecnicos", icon: <IconRefresh /> },
    { label: "Configuración", href: "/dashboard/admin/configuracion", icon: <IconSearch /> },
  ],
  cliente: [
    { label: "Dashboard", href: "/dashboard/cliente", icon: <IconLightning /> },
    { label: "Registrar Servicio", href: "/dashboard/cliente/registrar", icon: <IconPlusCircle /> },
    { label: "Servicios Activos", href: "/dashboard/cliente/activos", icon: <IconRefresh /> },
    { label: "Satisfacción", href: "/dashboard/cliente/satisfaccion", icon: <IconBox /> },
    { label: "Mi Perfil", href: "/dashboard/cliente/perfil", icon: <IconSearch /> },
  ]
};

export default function Sidebar() {
  const pathname = usePathname();
  
  const role = pathname.startsWith("/dashboard/admin") 
    ? "admin" 
    : pathname.startsWith("/dashboard/tecnico") 
      ? "tecnico" 
      : "cliente";
      
  const currentMenu = MENUS[role] || MENUS["cliente"];

  return (
    <aside className="w-[260px] bg-white rounded-[2rem] shadow-sm flex-shrink-0 flex flex-col h-full overflow-hidden">
      <div className="p-8 pb-4 flex justify-center">
        {/* Usando Image de Next.js. Asegúrate de tener /logo.png en public */}
        <Image src="/logo.png" alt="Nakeema Logo" width={160} height={40} className="h-auto w-40 object-contain" priority />
      </div>

      <nav className="flex-1 px-6 py-6 space-y-3 overflow-y-auto">
        {currentMenu.map((item, idx) => {
          // Coincidencia exacta o si la ruta actual empieza con href (excepto dashboard principal)
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== `/dashboard/${role}`);
          
          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-3.5 transition-all duration-200 ${
                isActive
                  ? "bg-[#0da766] text-white rounded-xl font-bold shadow-md shadow-green-500/20"
                  : "text-gray-500 hover:text-gray-800 font-bold bg-transparent"
              }`}
            >
              <div className={`${isActive ? "text-white" : "opacity-60"}`}>
                {item.icon}
              </div>
              <span className="text-[13px] tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-8">
        <Link
          href="/"
          className="flex items-center gap-3 px-5 py-3 text-[#d9304f] hover:bg-red-50 rounded-xl transition-colors font-black text-[13px] tracking-wide"
        >
          <IconLogout />
          Salir
        </Link>
      </div>
    </aside>
  );
}