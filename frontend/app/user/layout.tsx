"use client";

import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dataUser = JSON.parse(`${sessionStorage.getItem("data_user")}`);

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="relative overflow-hidden max-h-screen w-full"></div>
        <nav className="fixed right-0 top-0 left-60 bg-white shadow-sm py-3 px-4 h-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-yellow-600 focus:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 focus:border-yellow-300 transition"
              >
                <span className="text-sm">
                  {dataUser.user.props.name || "Usuário"}
                </span>
              </button>
            </div>
          </div>
        </nav>
        {children}
      </main>
    </Suspense>
  );
}
