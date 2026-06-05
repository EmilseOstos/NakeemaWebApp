export default function ClienteDashboard() {
  const historial = [
    { icon: "⏱️", iconBg: "bg-yellow-50 text-yellow-500 border-yellow-100", title: "Mantenimiento Preventivo", subtitle: "Instalación solicitada", badge: "bg-yellow-400 text-white", estado: "Pendiente",   fecha: "Hoy, 10:30 am" },
    { icon: "🔧", iconBg: "bg-green-50 text-[#0da766] border-green-100",    title: "Reparación Eléctrica",    subtitle: "Cambio alternador",       badge: "bg-[#0da766] text-white",  estado: "Completado", fecha: "12 Mar 2026"   },
    { icon: "⚙️", iconBg: "bg-green-50 text-[#0da766] border-green-100",    title: "Revisión General",         subtitle: "Chequeo 10.000 KM",       badge: "bg-[#0da766] text-white",  estado: "Completado", fecha: "05 Ene 2026"   },
  ];

  return (
    <div className="space-y-5">

      {/* Banner bienvenida */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h4 className="font-black text-gray-800 text-xl mb-1">¡Hola, Emilse! 👋</h4>
        <p className="text-gray-500 text-sm">
          Tienes <strong className="text-yellow-500">1 servicio en proceso</strong> actualmente. Tu solicitud más reciente fue hace 2 días.
        </p>
      </div>

      {/* Historial reciente */}
      <div className="bg-white rounded-2xl px-6 pt-6 pb-2 shadow-sm border border-gray-100">
        <h5 className="font-black text-[#0da766] text-lg mb-1">Historial Reciente</h5>

        {/* Encabezados de tabla */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 py-3 mb-2">
          <span>Servicio</span>
          <span className="text-center">Estado</span>
          <span className="text-right">Fecha / Hora</span>
        </div>

        {historial.map((item, i) => (
          <div key={i} className={`grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] items-center py-4 gap-3 ${i < historial.length - 1 ? "border-b border-gray-50" : ""}`}>
            {/* Servicio */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border flex-shrink-0 ${item.iconBg}`}>
                {item.icon}
              </div>
              <div>
                <div className="font-bold text-gray-800 text-sm leading-tight">{item.title}</div>
                <div className="text-gray-400 text-xs">{item.subtitle}</div>
              </div>
            </div>
            {/* Estado */}
            <div className="md:text-center">
              <span className={`${item.badge} text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1`}>
                {item.estado === "Completado" ? "✓" : "⏰"} {item.estado}
              </span>
            </div>
            {/* Fecha */}
            <div className="md:text-right text-gray-400 text-sm font-medium">
              {item.fecha}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-400 text-xs py-3">
        © 2026 Todos los derechos Reservados. Nakeema
      </p>

      {/* FAB chat */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-[#0da766] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0a8752] transition-colors z-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
        </svg>
      </button>
    </div>
  );
}