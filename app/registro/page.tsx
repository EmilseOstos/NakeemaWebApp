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
    <main className="min-h-screen bg-[#f3f4f6] flex flex-col items-center justify-between py-10 px-4">
      <div />

      <div className="bg-white w-full max-w-[440px] px-10 py-10 rounded-[28px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex flex-col items-center border border-gray-100">

        <div className="mb-6">
          <Image
            src="/logo.png"
            alt="Nakeema Logo"
            width={180}
            height={50}
            priority
            className="object-contain"
          />
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Crear nueva cuenta</h2>

        <form onSubmit={handleRegistro} className="w-full space-y-4">

          {/* Nombre */}
          <div className="relative">
            <input
              type="text"
              placeholder="Nombre completo"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-3.5 bg-[#f8fafc] text-gray-700 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 border border-gray-100 transition-all text-sm"
            />
          </div>

          {/* Correo Electrónico */}
          <div className="relative">
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-[#f8fafc] text-gray-700 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 border border-gray-100 transition-all text-sm"
            />
          </div>

          {/* Contraseña */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-4 pr-12 py-3.5 bg-[#f8fafc] text-gray-700 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 border border-gray-100 transition-all text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          {/* Confirmar Contraseña */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirmar contraseña"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-[#f8fafc] text-gray-700 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 border border-gray-100 transition-all text-sm"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-white font-semibold rounded-xl shadow-md active:scale-[0.99] transition-all text-sm mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            style={{ background: "linear-gradient(to right, #5cb85c, #00693e)" }}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Registrarse"
            )}
          </button>
        </form>

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

        <div className="mt-6 flex flex-col items-center space-y-1.5 text-sm text-gray-500">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link href="/" className="text-[#0da766] font-bold hover:underline">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>

      <p className="text-[11px] text-gray-400 tracking-wide mt-6">
        © 2026 Todos los derechos Reservados. Nakeema
      </p>
    </main>
  );
}
