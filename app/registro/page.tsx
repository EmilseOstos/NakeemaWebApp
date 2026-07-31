"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function RegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleRegistro = async (e: React.FormEvent) => {
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
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: `Cuenta creada exitosamente. Redirigiendo...`, type: "success" });
        setTimeout(() => {
          // Si el login funcionara de una vez con el rol Cliente...
          router.push("/");
        }, 1500);
      } else {
        setMessage({
          text: data.error || "Error al registrarse.",
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

        <h2 className="text-lg font-bold text-nk-muted mb-5 text-center">Crear nueva cuenta</h2>

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

        <form onSubmit={handleRegistro}>

          {/* Nombre */}
          <div className="form-floating-custom">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              type="text"
              placeholder="Nombre completo"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          {/* Correo Electrónico */}
          <div className="form-floating-custom">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Contraseña */}
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
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          {/* Confirmar Contraseña */}
          <div className="form-floating-custom">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirmar contraseña"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              "Registrarse"
            )}
          </button>
        </form>

        <div className="login-links">
          <Link href="/" className="hover:text-[#0da766]">
            ¿Ya tienes una cuenta? <b>Iniciar Sesión</b>
          </Link>
        </div>
      </div>

      <p className="copyright">
        © 2026 Todos los derechos Reservados. Nakeema
      </p>
    </main>
  );
}
