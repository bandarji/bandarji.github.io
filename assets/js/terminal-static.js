(function () {
  const canvas = document.querySelector(".terminal-static-noise");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const width = 160;
  const height = 90;
  canvas.width = width;
  canvas.height = height;

  const frame = ctx.createImageData(width, height);
  const pixels = frame.data;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function paint(full) {
    for (let i = 0; i < pixels.length; i += 4) {
      if (!full && Math.random() > 0.18) continue;
      const n = Math.random() * 255;
      pixels[i] = n * 0.2;
      pixels[i + 1] = n;
      pixels[i + 2] = n * 0.25;
      pixels[i + 3] = 70 + Math.random() * 90;
    }
    ctx.putImageData(frame, 0, 0);
  }

  paint(true);
  if (reduceMotion) return;

  function loop() {
    paint(false);
    setTimeout(function () {
      requestAnimationFrame(loop);
    }, 200);
  }

  requestAnimationFrame(loop);
})();
