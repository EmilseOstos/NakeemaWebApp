"use client";

export default function AdminDashboard() {
  const tecnicos = [
    { name: "Carlos Roa",    specialty: "Especialista Eléctrico",  status: "Disponible", bg: "bg-blue-500" },
    { name: "Kelly Ramirez", specialty: "Soporte Técnico Nivel 2", status: "Ocupado",    bg: "bg-gray-400" },
    { name: "Luis Zea",      specialty: "Mecánico General",        status: "Inactivo",   bg: "bg-red-500" },
    { name: "Camilo Suarez", specialty: "Técnico de Redes",        status: "Ocupado",    bg: "bg-orange-400" },
    { name: "Royer Marin",   specialty: "Electricista Industrial", status: "Disponible", bg: "bg-[#0da766]" },
    { name: "Marlon E.",     specialty: "Soporte Nivel 1",         status: "Disponible", bg: "bg-purple-500" },
    { name: "Enrique M.",    specialty: "Mecánico Automotriz",     status: "Inactivo",   bg: "bg-red-400" },
  ];

  const badgeStyle: Record<string, string> = {
    Disponible: "bg-[#0da766] text-white",
    Ocupado:    "bg-yellow-400 text-yellow-900",
    Inactivo:   "bg-red-500 text-white",
  };

  return (
    <div className="space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { label: "Servicios Hoy",    value: "15", color: "text-[#0da766]" },
          { label: "Técnicos Activos", value: "6",  color: "text-[#0da766]" },
          { label: "Alertas",          value: "3",  color: "text-red-500"   },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-2">{kpi.label}</p>
            <p className={`text-4xl font-black ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Panel General */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-center text-gray-700 font-bold mb-5 text-base">Panel General</h4>
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = "/dashboard/admin/gestion"}
              className="w-full bg-[#0da766] hover:bg-[#0a8752] text-white rounded-xl py-4 px-5 text-center transition-colors shadow-sm"
            >
              <p className="text-xs font-medium opacity-80 mb-0.5">Registros completados:</p>
              <p className="text-3xl font-black">400</p>
            </button>

            <button
              onClick={() => window.location.href = "/dashboard/admin/gestion"}
              className="w-full bg-[#0da766] hover:bg-[#0a8752] text-white rounded-xl py-4 px-5 text-center transition-colors shadow-sm"
            >
              <p className="text-xs font-medium opacity-80 mb-0.5">Servicios Pendientes:</p>
              <p className="text-3xl font-black">6</p>
            </button>

            <button
              onClick={() => window.location.href = "/dashboard/admin/reportes"}
              className="w-full bg-[#0da766] hover:bg-[#0a8752] text-white rounded-xl py-3.5 px-5 text-center font-bold transition-colors shadow-sm"
            >
              Historial de Servicios
            </button>
          </div>
        </div>

        {/* Estado Técnicos */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-center text-gray-700 font-bold mb-5 text-base">Estado Técnicos</h4>
          <div className="space-y-2 overflow-y-auto max-h-[320px]">
            {tecnicos.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 px-1">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${t.bg} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 leading-tight">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.specialty}</div>
                  </div>
                </div>
                <span className={`${badgeStyle[t.status]} text-xs font-bold px-3 py-1 rounded-full`}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-gray-400 text-xs py-3">
        © 2026 Todos los derechos Reservados. Nakeema
      </p>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-[#0da766] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0a8752] transition-colors z-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
        </svg>
      </button>
    </div>
  );
}
