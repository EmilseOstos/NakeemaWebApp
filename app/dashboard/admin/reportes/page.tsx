"use client";

export default function ReportesPage() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h3 className="font-black text-[#0da766] text-2xl">Reportes de Rendimiento</h3>
        <button
          onClick={() => alert("Generando PDF...")}
          className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
        >
          <span>📥</span> Exportar PDF
        </button>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Ingresos", value: "$12,450", sub: "+8.5% este mes", subClass: "text-green-500", border: "border-gray-100" },
          { title: "Completados", value: "145", sub: "+12% este mes", subClass: "text-green-500", border: "border-[#0da766] bg-[#0da766]/5" },
          { title: "En Proceso", value: "32", sub: "Actividad constante", subClass: "text-gray-400", border: "border-yellow-400 bg-yellow-50" },
          { title: "Cancelados", value: "4", sub: "-2% este mes", subClass: "text-red-500", border: "border-red-400 bg-red-50" },
        ].map((stat, i) => (
          <div key={i} className={`bg-white rounded-2xl p-5 shadow-sm border ${stat.border}`}>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{stat.title}</h4>
            <div className="text-3xl font-black text-gray-800">{stat.value}</div>
            <div className={`text-xs font-bold mt-2 ${stat.subClass}`}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-80 flex flex-col">
          <h5 className="font-bold text-lg text-gray-800 mb-6">Evolución de Servicios Mensual</h5>
          <div className="flex-grow flex items-end justify-between gap-2 md:gap-4 px-2">
            {[40, 60, 50, 80, 75, 95].map((h, i) => (
              <div key={i} className="w-full bg-[#0da766]/20 rounded-t-lg relative group">
                <div 
                  className="absolute bottom-0 w-full bg-[#0da766] rounded-t-lg transition-all duration-500 group-hover:bg-[#0a8752]"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 px-2 text-xs font-bold text-gray-400 border-t border-gray-50 pt-3">
            <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
          <h5 className="font-bold text-lg text-gray-800 mb-6 w-full text-left">Distribución por Estado</h5>
          <div className="relative w-40 h-40 rounded-full border-[16px] border-gray-50 flex items-center justify-center my-auto">
            {/* Simulación visual de gráfico circular */}
            <div className="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-t-[#0da766] border-r-[#0da766] transform rotate-45"></div>
            <div className="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-b-yellow-400 transform rotate-12"></div>
            <div className="text-3xl font-black text-gray-800">181</div>
          </div>
          <div className="w-full mt-6 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#0da766]"></span> Completados</span>
              <span className="font-bold text-gray-800">80%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> Proceso</span>
              <span className="font-bold text-gray-800">18%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Cancelados</span>
              <span className="font-bold text-gray-800">2%</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-400 text-xs py-3">© 2026 Todos los derechos Reservados. Nakeema</p>
    </div>
  );
}
