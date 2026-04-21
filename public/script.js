const canvas = document.getElementById('demo');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 640;
  const cssH = 240;
  canvas.width = cssW * dpr;
  canvas.height = cssH * dpr;
  ctx.scale(dpr, dpr);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 22px -apple-system, "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Hello, Vibe Coding!', cssW / 2, cssH / 2 - 12);

  ctx.fillStyle = '#93c5fd';
  ctx.font = '14px -apple-system, "PingFang SC", sans-serif';
  ctx.fillText('请把这里替换成你的作品入口', cssW / 2, cssH / 2 + 18);
}
