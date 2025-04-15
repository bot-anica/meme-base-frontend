import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout() {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-3 sm:px-4 md:px-6 flex-grow pt-8 sm:pt-12 md:pt-16">
        <Outlet />
      </main>
    </div>
  );
}
