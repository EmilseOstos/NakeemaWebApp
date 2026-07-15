"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f4f6f8] p-4 md:p-5 gap-4 md:gap-5 border-t-8 border-[#930b38] overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-[260px] md:w-[260px] md:flex-shrink-0
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative
          p-4 md:p-0
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 bg-white rounded-[2rem] shadow-sm flex flex-col overflow-hidden relative min-w-0">
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <Topbar onMenuToggle={() => setSidebarOpen(true)} />
          <main className="mt-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
