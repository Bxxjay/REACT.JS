import { useRef, useEffect } from "react";

export default function CursorMaskReveal({
  foregroundImage = "/images/foreground.jpg",
  backgroundImage = "/images/background.jpg",
  overlayColor = "rgba(0,0,0,0.6)",
  maskSize = 200,
}) {
  const canvasRef = useRef(null);
  const posRef = useRef({ x: -9999, y: -9999 });
  const fgImg = useRef(new Image());
  const bgImg = useRef(new Image());
  const loadedCount = useRef(0);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const tryStart = () => {
      loadedCount.current += 1;
      if (loadedCount.current === 2) startLoop();
    };

    fgImg.current.crossOrigin = "anonymous";
    bgImg.current.crossOrigin = "anonymous";

    fgImg.current.onload = tryStart;
    bgImg.current.onload = tryStart;

    fgImg.current.src = foregroundImage;
    bgImg.current.src = backgroundImage;

    const startLoop = () => {
      const draw = () => {
        const w = canvas.width;
        const h = canvas.height;
        const { x, y } = posRef.current;

        ctx.clearRect(0, 0, w, h);

        // Draw background image
        ctx.drawImage(bgImg.current, 0, 0, w, h);

        // Offscreen canvas for foreground + overlay + hole
        const offscreen = document.createElement("canvas");
        offscreen.width = w;
        offscreen.height = h;
        const offCtx = offscreen.getContext("2d");

        // Draw foreground
        offCtx.drawImage(fgImg.current, 0, 0, w, h);

        // Draw overlay
        offCtx.fillStyle = overlayColor;
        offCtx.fillRect(0, 0, w, h);

        // Punch circle hole
        offCtx.globalCompositeOperation = "destination-out";
        offCtx.beginPath();
        offCtx.arc(x, y, maskSize / 2, 0, Math.PI * 2);
        offCtx.fill();

        // Draw onto main canvas
        ctx.drawImage(offscreen, 0, 0);

        animRef.current = requestAnimationFrame(draw);
      };

      draw();
    };

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [foregroundImage, backgroundImage, maskSize, overlayColor]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    posRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <div
      className="relative w-full cursor-none"
      style={{ height: "100vh" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        posRef.current = { x: -9999, y: -9999 };
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}