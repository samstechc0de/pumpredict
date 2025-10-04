// Pumpredict simple content script
(async function() {
  const workerBase = (globalThis.PREDICT_WORKER_BASE) ? globalThis.PREDICT_WORKER_BASE : 'https://pumpredict-worker.example.workers.dev';
  // Extract token (mint) from Pump.fun URL
  const match = window.location.pathname.match(/\/coin\/([^/]+)/);
  if (!match) return;
  const token = match[1];
  try {
    const res = await fetch(`${workerBase}/markets?token=${encodeURIComponent(token)}`);
    const data = await res.json();
    injectOverlay(data.markets || []);
  } catch (err) {
    console.error('Pumpredict fetch error', err);
  }

  function injectOverlay(markets) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.bottom = '20px';
    overlay.style.right = '20px';
    overlay.style.background = '#111';
    overlay.style.color = '#fff';
    overlay.style.padding = '12px';
    overlay.style.borderRadius = '8px';
    overlay.style.zIndex = '10000';
    overlay.style.maxWidth = '300px';
    overlay.innerHTML = `<strong>Pumpredict markets</strong><ul style="margin-top:8px; list-style: none; padding-left: 0;">${markets.map(m => `<li style="margin-bottom:4px;">${m.title}</li>`).join('')}</ul>`;
    document.body.appendChild(overlay);
  }
})();
