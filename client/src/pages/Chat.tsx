import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { PortfolioChat } from "@/components/sections/PortfolioChat";

export default function Chat() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Chat with Shashank | Portfolio Assistant";
    // Remove any dark theme attribute when on chat page
    document.documentElement.removeAttribute("data-section-theme");
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#111] selection:bg-[#c84b1f] selection:text-white">
      <Navbar />
      <main className="relative">
        <PortfolioChat standalone />
      </main>
    </div>
  );
}

