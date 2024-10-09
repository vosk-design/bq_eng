import { Suspense } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Logo from "@/components/Logo";
import Gradient from "@/components/Gradient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full min-h-screen relative z-30">
      <Suspense>
        <Navbar />
      </Suspense>
      <Logo />
      <Gradient />
      {children}
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
}
