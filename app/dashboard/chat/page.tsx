"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ChatPanel from "@/app/components/ChatPanel";

type Servicio = { id: string; titulo?: string | null; descripcion: string; estado: string };

const normalizarRol = (rol: string) =>
  rol.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function ChatPageContent() {
  const searchParams = useSearchParams();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [userId, setUserId] = useState("");
  const [loadingServicios, setLoadingServicios] = useState(true);

  useEffect(() => {
    const servicioQuery = searchParams.get("servicio");
    if (servicioQuery) {
      const timer = setTimeout(() => setSelectedId(servicioQuery), 0);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const cargarServicios = useCallback(async () => {
    setLoadingServicios(true);
    try {
      const meRes = await fetch('/api/me');
      const me = await meRes.json();
      const user = me.user;
      if (user) {
        setUserId(user.id);
      }
      const rolLower = user?.rol ? normalizarRol(user.rol) : '';

      let endpoint = '/api/servicios';
      if (rolLower === 'tecnico' || rolLower === 'cliente') {
        const perfilRes = await fetch('/api/perfil');
        const perfil = await perfilRes.json();
        const pid = perfil.data?.id;
        if (pid) {
          endpoint = `/api/servicios?${rolLower === 'tecnico' ? 'tecnico_id' : 'cliente_id'}=${pid}`;
        } else {
          setServicios([]);
          return;
        }
      }

      const res = await fetch(endpoint);
      const json = await res.json();
      setServicios(json.data || []);
    } catch {
      setServicios([]);
    } finally {
      setLoadingServicios(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(cargarServicios, 0);
    return () => clearTimeout(timer);
  }, [cargarServicios]);

  return (
    <div className="space-y-5">
      <h3 className="font-black text-[#0da766] text-2xl">Chat por Servicio</h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4 nk-card p-5">
          <h4 className="font-bold text-sm text-gray-700 mb-4">Seleccionar Servicio</h4>
          <div className="space-y-2">
            {loadingServicios ? (
              <div className="flex justify-center py-6">
                <div className="w-6 h-6 border-2 border-[#0da766] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : servicios.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${
                  selectedId === s.id
                    ? "bg-[#0da766] text-white font-bold"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="font-mono">#{s.id.slice(0, 8)}</span>
                <span className="block text-xs opacity-70 truncate mt-0.5">{s.titulo || s.descripcion?.slice(0, 50)}</span>
              </button>
            ))}
            {!loadingServicios && servicios.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">No hay servicios disponibles</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 h-[500px]">
          {selectedId && userId ? (
            <ChatPanel servicioId={selectedId} userId={userId} />
          ) : (
            <div className="h-full flex items-center justify-center nk-card">
              <div className="text-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-3 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
                <p className="font-bold">Selecciona un servicio</p>
                <p className="text-sm">para ver el chat</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-10"><div className="w-8 h-8 border-4 border-[#0da766] border-t-transparent rounded-full animate-spin" /></div>}>
      <ChatPageContent />
    </Suspense>
  );
}
