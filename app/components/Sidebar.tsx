"use client";

import { usePathname, useRouter } from "next/navigation";
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

function IconChat() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
    </svg>
  );
}

function IconGear() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

const MENUS: Record<string, MenuItem[]> = {
  tecnico: [
    { label: "Dashboard", href: "/dashboard/tecnico", icon: <IconLightning /> },
    { label: "Nuevo Reporte", href: "/dashboard/tecnico/reporte", icon: <IconPlusCircle /> },
    { label: "Actualizar Estado", href: "/dashboard/tecnico/estado", icon: <IconRefresh /> },
    { label: "Solicitar", href: "/dashboard/tecnico/insumos", icon: <IconBox /> },
    { label: "Consultar", href: "/dashboard/tecnico/servicios", icon: <IconSearch /> },
    { label: "Chat", href: "/dashboard/chat", icon: <IconChat /> },
    { label: "Mi Perfil", href: "/dashboard/tecnico/perfil", icon: <IconUser /> },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard/admin", icon: <IconLightning /> },
    { label: "Gestión", href: "/dashboard/admin/gestion", icon: <IconPlusCircle /> },
    { label: "Proveedores", href: "/dashboard/admin/proveedores", icon: <IconBox /> },
    { label: "Clientes", href: "/dashboard/admin/clientes", icon: <IconUser /> },
    { label: "Reportes", href: "/dashboard/admin/reportes", icon: <IconChart /> },
    { label: "Técnicos", href: "/dashboard/admin/tecnicos", icon: <IconClipboard /> },
    { label: "Chat", href: "/dashboard/chat", icon: <IconChat /> },
    { label: "Configuración", href: "/dashboard/admin/configuracion", icon: <IconGear /> },
  ],
  cliente: [
    { label: "Dashboard", href: "/dashboard/cliente", icon: <IconLightning /> },
    { label: "Registrar Servicio", href: "/dashboard/cliente/registrar", icon: <IconPlusCircle /> },
    { label: "Servicios Activos", href: "/dashboard/cliente/activos", icon: <IconClipboard /> },
    { label: "Satisfacción", href: "/dashboard/cliente/satisfaccion", icon: <IconChart /> },
    { label: "Chat", href: "/dashboard/chat", icon: <IconChat /> },
    { label: "Mi Perfil", href: "/dashboard/cliente/perfil", icon: <IconUser /> },
  ]
};

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const role = pathname.startsWith("/dashboard/admin") 
    ? "admin" 
    : pathname.startsWith("/dashboard/tecnico") 
      ? "tecnico" 
      : "cliente";
      
  const currentMenu = MENUS[role] || MENUS["cliente"];

  const handleNav = (href: string) => {
    router.push(href);
    onClose?.();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="sidebar-logo">
        <Image src="/logo.png" alt="Nakeema Logo" width={160} height={40} className="nk-img-contain h-auto" priority />
      </div>

      <nav className="flex flex-col gap-1 flex-1 overflow-y-auto pb-3">
        {currentMenu.map((item, idx) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== `/dashboard/${role}`);
          
          return (
            <button
              key={idx}
              onClick={() => handleNav(item.href)}
              className={`nav-link-custom flex-center-gap ${isActive ? "active" : ""}`}
            >
              <span className={`${isActive ? "text-white" : "opacity-60"}`}>{item.icon}</span>
              <span className="text-[13px] tracking-wide">{item.label}</span>
            </button>
          );
        })}

        <div className="mt-auto pt-3">
          <button
            onClick={async () => {
              await fetch('/api/logout', { method: 'POST' });
              onClose?.();
              router.push('/');
            }}
            className="nav-link-custom text-[#d9304f] flex-center-gap hover:bg-red-50"
          >
            <IconLogout />
            <span className="text-[13px] tracking-wide font-bold">Salir</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
