"use client";

import { useEffect, useState } from "react";
import Toast from "@/app/components/Toast";

const LABELS = ["", "😞 Malo", "😐 Regular", "🙂 Bueno", "😊 ¡Muy Bueno!", "🤩 ¡Excelente!"];

type Servicio = { id: string; descripcion: string; fecha_creacion: string };

export default function SatisfaccionPage() {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [clienteNombre, setClienteNombre] = useState("");

  useEffect(() => {
    fetch('/api/perfil')
      .then(res => res.json())
      .then(async (data) => {
        if (data.data) {
          setClienteNombre(data.data.nombre || "");
          if (data.data.id) {
            const res = await fetch(`/api/servicios?cliente_id=${data.data.id}`);
            const json = await res.json();
            setServicios(json.data || []);
          }
        }
      })
      .catch(() => setToastType("error"));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const idServicio = fd.get("servicio") as string;
    if (!idServicio) {
      setToast("Selecciona un servicio para calificar");
      setToastType("error");
      setTimeout(() => setToast(""), 3000);
      setLoading(false);
      return;
    }
    const payload = {
      idServicio,
      calificacion: rating,
      comentario: fd.get("comentario") || "Sin comentarios",
      cliente: clienteNombre,
    };
    try {
      const res = await fetch("/api/satisfaccion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setToast("¡Gracias! Tu evaluación ha sido enviada exitosamente");
        setToastType("success");
        (e.target as HTMLFormElement).reset();
        setRating(4);
      } else {
        setToast("No se pudo enviar la evaluación. Intenta de nuevo.");
        setToastType("error");
      }
    } catch {
      setToast("Error de conexión. Intenta de nuevo.");
      setToastType("error");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 3000);
    }
  };

  const displayRating = hover || rating;

  return (
    <div className="space-y-5">
      <h3 className="font-black text-[#0da766] text-2xl">Reporte de Satisfacción</h3>

      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="text-7xl mb-3">😍</div>
          <h4 className="font-black text-gray-800 text-xl mb-1">¡Queremos escucharte!</h4>
          <p className="text-gray-400 text-sm mb-6">Evalúa el servicio prestado para ayudarnos a mejorar cada día.</p>

          <form onSubmit={handleSubmit} className="text-left space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Servicio a calificar</label>
              {servicios.length === 0 ? (
                <div className="bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-400 text-center">
                  No tienes servicios para calificar todavía.
                </div>
              ) : (
                <select
                  name="servicio"
                  required
                  className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0da766]/30 appearance-none"
                >
                  <option value="">Seleccionar servicio...</option>
                  {servicios.map((s) => (
                    <option key={s.id} value={s.id}>
                      #{s.id.slice(0, 8)} - {s.descripcion.slice(0, 40)} ({s.fecha_creacion?.slice(0, 10)})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="text-center">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Calificación del Técnico</label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                    className={`text-4xl transition-transform hover:scale-110 ${star <= displayRating ? "text-[#0da766]" : "text-gray-200"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="font-bold mt-2 text-[#0da766] text-sm">{LABELS[displayRating]}</div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Comentarios (Opcional)</label>
              <textarea
                name="comentario"
                rows={3}
                placeholder="¿Qué te pareció el servicio? Cuéntanos tu experiencia..."
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0da766]/30 resize-none"
              />
            </div>

            <div className="flex justify-center pt-1">
              <button
                type="submit"
                disabled={loading || servicios.length === 0}
                className="px-10 py-3 rounded-full font-bold text-sm bg-[#0da766] text-white hover:bg-[#0a8752] transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
                Enviar Evaluación
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
