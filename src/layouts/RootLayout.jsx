import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import { usePWA } from '../hooks/usePWA.js';

export default function RootLayout() {
  const { isOnline, updateAvailable, applyUpdate, canInstall, triggerInstall } = usePWA();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      <NavBar isOnline={isOnline} canInstall={canInstall} onInstall={triggerInstall} />

      {/* Offline Status Banner */}
      {!isOnline && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-3 py-2 text-center text-[11px] text-amber-200">
          ⚠️ Вы работаете в автономном режиме (Offline). Доступны ранее открытые страницы и кэшированные задачи.
        </div>
      )}

      {/* Service Worker Update Notification Banner */}
      {updateAvailable && (
        <div className="bg-indigo-600 text-white px-4 py-2.5 flex flex-wrap items-center justify-center gap-3 text-xs shadow-lg">
          <span className="font-medium">🚀 Доступна новая версия приложения DevTask Hub!</span>
          <button
            onClick={applyUpdate}
            className="px-3 py-1 bg-white text-indigo-700 font-bold rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Обновить сейчас
          </button>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5">
        <Outlet context={{ isOnline, canInstall, triggerInstall }} />
      </main>

      <footer className="border-t border-slate-900 py-4 px-3 text-center text-[11px] text-slate-500">
        DevTask Hub © 2026 — Medeu Seidali. Installable PWA • Offline-First Architecture.
      </footer>
    </div>
  );
}
