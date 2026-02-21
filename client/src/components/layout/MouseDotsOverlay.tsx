import { useEffect, useState } from "react";

export function MouseDotsOverlay() {
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setMouse({ x: event.clientX, y: event.clientY, active: true });
    };
    const onLeaveViewport = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        setMouse((prev) => ({ ...prev, active: false }));
      }
    };
    const onWindowBlur = () => setMouse((prev) => ({ ...prev, active: false }));

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseout", onLeaveViewport);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onLeaveViewport);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[40]">
      <div
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: mouse.active ? 0.3 : 0,
          background: `radial-gradient(circle 185px at ${mouse.x}px ${mouse.y}px, rgba(202,194,255,0.18) 0%, rgba(202,194,255,0.07) 52%, rgba(202,194,255,0) 100%)`,
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: mouse.active ? 0.72 : 0,
          backgroundImage:
            "radial-gradient(rgba(226,230,255,0.34) 1.2px, transparent 1.2px)",
          backgroundSize: "44px 44px",
          maskImage: `radial-gradient(circle 210px at ${mouse.x}px ${mouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 58%, rgba(0,0,0,0.35) 78%, rgba(0,0,0,0) 100%)`,
          WebkitMaskImage: `radial-gradient(circle 210px at ${mouse.x}px ${mouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 58%, rgba(0,0,0,0.35) 78%, rgba(0,0,0,0) 100%)`,
        }}
      />
    </div>
  );
}
