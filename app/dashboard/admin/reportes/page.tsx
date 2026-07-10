"use client";

export default function ReportesPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Centro de Reportes</h1>
          <p className="text-gray-500 mt-1">Descarga y analiza los datos de la plataforma.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center">
          
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight mb-3">
            Sin Reportes Disponibles
          </h2>
          
          <p className="text-gray-500 mb-8" data-testid="mensaje-vacio">
            Actualmente la pantalla está vacía. No hay datos suficientes o reportes generados para mostrar en este momento.
          </p>

          <button 
            disabled
            data-testid="btn-descargar-reportes"
            className="w-full py-3 px-4 bg-gray-100 text-gray-400 font-medium rounded-xl cursor-not-allowed transition-all"
          >
            Descargar Reportes
          </button>

        </div>
      </div>
    </div>
  );
}
