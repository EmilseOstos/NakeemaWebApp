"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleRecuperar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/recuperar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: data.message || 'Si el correo está registrado, recibirás instrucciones.', type: 'success' });
        if (data.hint) {
          setMessage({ text: `${data.message} Enlace de desarrollo: ${data.hint}`, type: 'success' });
        }
        setEmail('');
      } else {
        setMessage({ text: data.error || 'No se pudo procesar la solicitud.', type: 'error' });
      }
    } catch {
      setMessage({
        text: 'Error de conexión con el servidor. Intenta de nuevo.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-container">
      <div className="login-card">

        <div className="login-logo">
          <Image
            src="/logo.png"
            alt="Nakeema Logo"
            width={200}
            height={55}
            priority
            className="nk-img-contain-lg h-auto"
          />
        </div>

        <h2 className="text-lg font-bold text-nk-muted mb-2 text-center">Recuperar Contraseña</h2>
        <p className="text-sm text-nk-muted text-center mb-5 fs-13">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        {message && (
          <div
            className={`mb-4 w-full p-3 rounded-xl text-sm text-center font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-red-50 text-red-600 border border-red-100"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleRecuperar}>
          {/* Correo Electrónico */}
          <div className="form-floating-custom">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <input
              type="email"
              placeholder="Correo electrónico registrado"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="btn-nakeema mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Enviar instrucciones"
            )}
          </button>
        </form>

        <div className="login-links">
          <Link href="/" className="hover:text-[#0da766]">
            <i className="mr-1">←</i> Volver a <b>Iniciar Sesión</b>
          </Link>
        </div>
      </div>

      <p className="copyright">
        © 2026 Todos los derechos Reservados. Nakeema
      </p>
    </main>
  );
}
