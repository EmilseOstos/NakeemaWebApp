"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";

type User = { id: string; email: string; rol: string };

type Notificacion = {
  id: string;
  texto: string;
  ruta: string;
};

const normalizarRol = (rol: string) =>
  rol.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function Topbar({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notificacion[]>([]);
  const [isDark, setIsDark] = useState(() => typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark");
  const notifRef = useRef<HTMLDivElement>(null);

  const cargarNotificaciones = useCallback(() => {
    const rolLower = user ? normalizarRol(user.rol) : null;
    fetch('/api/perfil')
      .then(res => res.json())
      .then(data => {
        const perfilId = data.data?.id;
        let endpoint = '/api/servicios';
        if (rolLower === 'tecnico' && perfilId) endpoint = `/api/servicios?tecnico_id=${perfilId}`;
        else if (rolLower === 'cliente' && perfilId) endpoint = `/api/servicios?cliente_id=${perfilId}`;

        fetch(endpoint)
          .then(res => res.json())
          .then(json => {
            const activos = (json.data || []).filter(
              (s: Record<string, unknown>) => s.estado === 'Pendiente' || s.estado === 'En Proceso'
            );
            const base = rolLower === 'admin' ? '/dashboard/admin/gestion' : rolLower === 'tecnico' ? '/dashboard/tecnico/servicios' : '/dashboard/cliente/activos';
            setNotifications(activos.slice(0, 10).map((s: Record<string, unknown>) => ({
              id: s.id as string,
              texto: `${(s.titulo as string) || 'Servicio'} #${(s.id as string).slice(0, 8)} - ${s.estado}`,
              ruta: base,
            })));
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, [user]);

  useEffect(() => {
    fetch('/api/me')
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) return;
    cargarNotificaciones();
    const interval = setInterval(cargarNotificaciones, 30000);
    return () => clearInterval(interval);
  }, [user, cargarNotificaciones]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('nk-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('nk-theme', 'light');
    }
  };

  const isAdmin = pathname.startsWith("/dashboard/admin");
  const isTecnico = pathname.startsWith("/dashboard/tecnico");

  const displayName = user?.email?.split('@')[0] || "Usuario";
  const initials = displayName.slice(0, 2).toUpperCase();

  const pageTitle = isTecnico
    ? "Portal Técnico"
    : isAdmin
      ? "Portal Administrador"
      : "Portal Cliente";

  const roleText = isTecnico
    ? "Técnico"
    : isAdmin
      ? "Administrador"
      : "Cliente";

  const notifCount = notifications.length;

  return (
    <header className="topbar">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          onClick={onMenuToggle}
          className="md:hidden text-gray-500 hover:text-[#0da766] transition-colors p-1"
          aria-label="Abrir menú"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {isAdmin ? (
          <div className="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
            </svg>
            <input type="text" placeholder="Buscar en el portal..." aria-label="Buscar" />
          </div>
        ) : (
          <h1 className="text-xl font-black text-gray-800 tracking-tight">{pageTitle}</h1>
        )}
      </div>

      <div className="flex items-center gap-4 md:gap-5 pe-3">
        <button
          onClick={toggleTheme}
          aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          className="text-gray-400 hover:text-[#0da766] transition-colors"
        >
          {isDark ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          )}
        </button>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="text-gray-400 hover:text-[#0da766] transition-colors relative"
            aria-label={`Notificaciones${notifCount ? ` (${notifCount} pendientes)` : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                {notifCount > 9 ? "9+" : notifCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="font-bold text-sm text-gray-800">Notificaciones</p>
              </div>
              {notifications.length === 0 ? (
                <div className="px-5 py-8 text-center text-gray-400 text-sm">
                  No hay servicios pendientes por atender.
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        setNotifOpen(false);
                        router.push(n.ruta);
                      }}
                      className="w-full text-left px-5 py-3 hover:bg-gray-50 border-b border-gray-50 text-sm text-gray-600 flex items-start gap-2"
                    >
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>{n.texto}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="user-profile cursor-pointer">
          <div className="user-info">
            <div className="user-name">{displayName}</div>
            <div className="user-role">{roleText}</div>
          </div>
          <div className="avatar">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
