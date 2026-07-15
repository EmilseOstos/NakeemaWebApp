"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

type User = { id: string; email: string; rol: string };

export default function Topbar({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications] = useState<string[]>([]);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/me')
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAdmin = pathname.startsWith("/dashboard/admin");
  const isTecnico = pathname.startsWith("/dashboard/tecnico");

  const displayName = user?.email?.split('@')[0] || "Usuario";
  const initials = displayName.slice(0, 2).toUpperCase();

  const pageTitle = isTecnico
    ? "Portal Técnico"
    : isAdmin
      ? "Portal Administrador"
      : "Portal Cliente";

  const notifCount = notifications.length;

  return (
    <header className="flex justify-between items-center bg-transparent">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden text-gray-500 hover:text-[#0da766] transition-colors p-1"
          aria-label="Abrir menú"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <h1 className="text-xl font-black text-gray-800 tracking-tight">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="text-gray-400 hover:text-[#0da766] transition-colors relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                {notifCount}
              </span>
            )}
            {notifCount === 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="font-bold text-sm text-gray-800">Notificaciones</p>
              </div>
              {notifications.length === 0 ? (
                <div className="px-5 py-8 text-center text-gray-400 text-sm">
                  No hay notificaciones nuevas
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((n, i) => (
                    <div key={i} className="px-5 py-3 hover:bg-gray-50 border-b border-gray-50 text-sm text-gray-600">
                      {n}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 border-l border-gray-200 pl-5">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-black text-gray-800 leading-none">{displayName}</div>
            <div className="text-xs text-gray-400 font-medium mt-1">{user?.rol || "—"}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-sm font-black text-gray-600 flex-shrink-0">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
