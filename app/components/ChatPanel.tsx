"use client";

import { useEffect, useState, useRef } from "react";
import Toast from "@/app/components/Toast";

type Mensaje = {
  id: string;
  mensaje: string;
  fecha_envio: string;
  leido: boolean;
  remitente_id: string;
  usuarios: {
    username: string;
    roles: { nombre: string };
  };
};

export default function ChatPanel({
  servicioId,
  userId,
  onClose,
}: {
  servicioId: string;
  userId: string;
  onClose?: () => void;
}) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!servicioId) return;
    const cargar = () => {
      fetch(`/api/chat?idServicio=${servicioId}`)
        .then(res => res.json())
        .then(data => {
          setMensajes(data.data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };
    cargar();
    const interval = setInterval(cargar, 5000);
    return () => clearInterval(interval);
  }, [servicioId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto.trim() || enviando) return;
    setEnviando(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          servicio_id: servicioId,
          remitente_id: userId,
          mensaje: texto.trim(),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setMensajes(prev => [...prev, { ...data.data, remitente_id: userId, usuarios: { username: "Tú", roles: { nombre: "" } } }]);
        setTexto("");
      } else {
        setToast("No se pudo enviar el mensaje");
        setToastType("error");
        setTimeout(() => setToast(""), 3000);
      }
    } catch {
      setToast("Error de conexión. Intenta de nuevo.");
      setToastType("error");
      setTimeout(() => setToast(""), 3000);
    } finally {
      setEnviando(false);
    }
  };

  if (!servicioId) return null;

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h4 className="font-bold text-sm text-gray-800">Chat - #{servicioId.slice(0, 8)}</h4>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="chat-messages">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-[#0da766] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : mensajes.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            No hay mensajes. Inicia la conversación.
          </div>
        ) : (
          mensajes.map((m) => {
            const esPropio = m.remitente_id === userId;
            return (
              <div
                key={m.id}
                className={`flex ${esPropio ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`msg-bubble ${esPropio ? "msg-user" : "msg-bot"}`}
                >
                  <div className="text-xs font-bold opacity-70 mb-1">
                    {esPropio ? "Tú" : m.usuarios?.username || "Usuario"}{" "}
                    {m.usuarios?.roles?.nombre ? `(${m.usuarios.roles.nombre})` : ""}
                  </div>
                  <div>{m.mensaje}</div>
                  <div className={`text-[10px] mt-1 ${esPropio ? "text-gray-400" : "text-white/60"}`}>
                    {new Date(m.fecha_envio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="chat-input-area">
        <input
          type="text"
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="text-sm"
        />
        <button
          type="submit"
          disabled={!texto.trim() || enviando}
          className="bg-[#0da766] text-white font-bold text-sm hover:bg-[#0a8752] transition-colors disabled:opacity-50"
        >
          {enviando ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          )}
        </button>
      </form>

      {toast && <Toast message={toast} type={toastType} />}
    </div>
  );
}
