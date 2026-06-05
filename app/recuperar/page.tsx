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

    // Simulación de envío
    setTimeout(() => {
      setMessage({ 
        text: "Si el correo está registrado, te enviaremos instrucciones para recuperar tu contraseña.", 
        type: "success" 
      });
      setLoading(false);
      setEmail("");
    }, 1200);
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
        
        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Recuperar Contraseña</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>

        <form onSubmit={handleRecuperar} className="w-full space-y-4">
          {/* Correo Electrónico */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Correo electrónico registrado"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-[#f8fafc] text-gray-700 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 border border-gray-100 transition-all text-sm"
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
              "Enviar instrucciones"
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
            <Link href="/" className="text-[#0da766] font-bold hover:underline">
              Volver al Inicio de Sesión
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
