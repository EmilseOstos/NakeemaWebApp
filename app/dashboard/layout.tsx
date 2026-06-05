import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#f4f6f8] p-4 md:p-5 gap-4 md:gap-5 border-t-8 border-[#930b38] overflow-hidden">
      {/* Barra Lateral Izquierda (Flotante y redondeada) */}
      <Sidebar />

      {/* Contenido Principal Derecho (Tarjeta blanca gigante) */}
      <div className="flex-1 bg-white rounded-[2rem] shadow-sm flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <Topbar />
          <main className="mt-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
