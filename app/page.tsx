"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!rol) {
      setMessage({ text: "Por favor, seleccione un rol.", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rol }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: `Autenticando...`, type: "success" });

        const destino = rol === "Administrador" ? "/dashboard/admin" : rol === "Técnico" ? "/dashboard/tecnico" : "/dashboard/cliente";
        router.push(destino);
      } else {
        setMessage({
          text: data.error || "Error al iniciar sesión.",
          type: "error",
        });
      }
    } catch {
      setMessage({
        text: "Error de conexión con el servidor. Intenta de nuevo.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-container">
      <div className="login-card">

        {/* Logo */}
        <div className="login-logo">
          <Image
            src="/logo.png"
            alt="Nakeema Logo"
            width={220}
            height={60}
            priority
            className="nk-img-contain-lg h-auto"
          />
        </div>

        {/* Alerta de error */}
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

        <form onSubmit={handleLogin}>
          {/* Input: Correo Electrónico */}
          <div className="form-floating-custom">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              type="email"
              placeholder="usuario@demo.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Input: Contraseña */}
          <div className="form-floating-custom">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-icon text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Select: Rol */}
          <div className="form-floating-custom">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.418.835 2.83 2m-5.66 0c.412-1.165 1.524-2 2.83-2z" />
            </svg>
            <select
              required
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="text-muted cursor-pointer appearance-none pr-10"
            >
              <option value="" disabled>-- Seleccionar Rol --</option>
              <option value="Administrador">Administrador</option>
              <option value="Técnico">Técnico</option>
              <option value="Cliente">Cliente</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>

          {/* Botón con Degradado Corporativo */}
          <button
            type="submit"
            disabled={loading}
            className="btn-nakeema mt-3 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        {/* Enlaces inferiores */}
        <div className="login-links">
          <Link href="/recuperar" className="hover:text-[#0da766]">
            Olvidé mi contraseña
          </Link>
          <Link href="/registro" className="hover:text-[#0da766]">
            Registrarse por primera vez
          </Link>
        </div>
      </div>

      {/* Footer */}
      <p className="copyright">
        © 2026 Todos los derechos Reservados. Nakeema
      </p>
    </main>
  );
}
