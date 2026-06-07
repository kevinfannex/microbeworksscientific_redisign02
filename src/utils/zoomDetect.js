// src/utils/zoomDetect.js
// Detect browser zoom level (approx.) and toggle a class on the <html> element.
// We consider zoom >= 125% as "zoomed".

function getZoomLevel() {
  // devicePixelRatio approximates zoom; 1.0 = 100%.
  return Math.round(window.devicePixelRatio * 100);
}

function updateZoomClass() {
  const html = document.documentElement;
  const zoom = getZoomLevel();
  if (zoom >= 125) {
    html.classList.add('zoom-125');
  } else {
    html.classList.remove('zoom-125');
  }
}

// Export for use in React entry point.
export function initZoomDetection() {
  // Initial check.
  updateZoomClass();
  // Update on resize (covers zoom changes via Ctrl+"-"/"+").
  window.addEventListener('resize', updateZoomClass);
  // Also listen for orientationchange on mobile.
  window.addEventListener('orientationchange', updateZoomClass);
}
