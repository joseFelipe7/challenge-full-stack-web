import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-br from-pink-500 to-orange-400">
      <Suspense>{children}</Suspense>
    </main>
  );
}
