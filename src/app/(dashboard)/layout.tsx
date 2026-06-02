"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-slate-800">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center">
            {/* Double ring loader */}
            <div className="absolute h-full w-full rounded-full border-4 border-slate-200"></div>
            <div className="absolute h-full w-full rounded-full border-4 border-t-cyan-500 animate-spin"></div>
          </div>
          <div className="text-sm font-semibold tracking-wide text-cyan-600 animate-pulse">
            Đang xác thực thông tin...
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Prevent rendering anything if not authenticated to avoid layout flash
    return (
      <div className="min-h-screen bg-slate-50" />
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-cyan-500/20 selection:text-cyan-800">
      <Header />
      <main className="flex-grow w-full flex flex-col bg-slate-50">
        {children}
      </main>
      <Footer />
    </div>
  );
}
