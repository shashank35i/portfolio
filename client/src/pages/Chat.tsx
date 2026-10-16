import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { PortfolioChat } from "@/components/sections/PortfolioChat";

export default function Chat() {
  useEffect(() => {
    const previousTitle = document.title;
    document.documentElement.setAttribute("data-section-theme", "zinc");
    document.title = "Chat with Shashank | Portfolio Assistant";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f1eb] text-[#191816] selection:bg-[#f04b23] selection:text-white">
      <Navbar />
      <main className="relative">
        <PortfolioChat standalone />
      </main>
    </div>
  );
}
