"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function ConfirmarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleCambiar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (password.length < 6) {
      setMessage({ text: "La contraseña debe tener al menos 6 caracteres.", type: "error" });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: "Las contraseñas no coinciden.", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/recuperar/cambiar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: data.message || 'Contraseña actualizada.', type: 'success' });
        setTimeout(() => router.push('/'), 1500);
      } else {
        setMessage({ text: data.error || 'No se pudo cambiar la contraseña.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Error de conexión con el servidor. Intenta de nuevo.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <Image src="/logo.png" alt="Nakeema Logo" width={200} height={55} priority className="nk-img-contain-lg h-auto" />
        </div>

        <h2 className="text-lg font-bold text-nk-muted mb-2 text-center">Nueva Contraseña</h2>
        <p className="text-sm text-nk-muted text-center mb-5 fs-13">
          Escribe tu nueva contraseña para recuperar el acceso a tu cuenta.
        </p>

        {!token ? (
          <div className="w-full p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm text-center font-medium">
            El enlace de recuperación es inválido. Solicita uno nuevo.
          </div>
        ) : (
          <form onSubmit={handleCambiar}>
            <div className="form-floating-custom">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                type="password"
                placeholder="Nueva contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-floating-custom">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <input
                type="password"
                placeholder="Confirmar nueva contraseña"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-nakeema mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Cambiar contraseña"
              )}
            </button>
          </form>
        )}

        {message && (
          <div
            className={`mt-5 w-full p-3 rounded-xl text-sm text-center font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-red-50 text-red-600 border border-red-100"
            }`}
          >
            {message.text}
          </div>
        )}

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

export default function ConfirmarRecuperacionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#0da766] border-t-transparent rounded-full animate-spin" /></div>}>
      <ConfirmarContent />
    </Suspense>
  );
}
