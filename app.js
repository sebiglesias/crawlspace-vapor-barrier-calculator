
const state = { len: 40, wid: 30, wallHgt: 12, piers: 6 };

function init() {
  const l = document.getElementById('crawlLen');
  const w = document.getElementById('crawlWid');
  const wh = document.getElementById('wallWrapHgt');
  const p = document.getElementById('pierCount');

  l.addEventListener('input', e => { state.len = parseFloat(e.target.value)||0; calc(); });
  w.addEventListener('input', e => { state.wid = parseFloat(e.target.value)||0; calc(); });
  wh.addEventListener('change', e => { state.wallHgt = parseFloat(e.target.value)||12; calc(); });
  p.addEventListener('input', e => { state.piers = parseInt(e.target.value, 10)||0; calc(); });
  calc();
}

function calc() {
  const floorArea = state.len * state.wid;
  const perim = 2 * (state.len + state.wid);
  const wallArea = perim * (state.wallHgt / 12);
  // Each pier wrapped: approx 16 sq ft
  const pierArea = state.piers * 16;

  const netSqFt = floorArea + wallArea + pierArea;
  // 15% overlap buffer for 12" seams
  const grossSqFt = Math.ceil(netSqFt * 1.15);
  const rolls = Math.ceil(grossSqFt / 1000);

  // Seam tape: total seam length is approximately (floorArea / 10) + wall perim
  const seamLength = (floorArea / 10) + perim;
  const tapeRolls = Math.max(1, Math.ceil(seamLength / 180));

  // Foundation pins: 1 every 24 inches (2 ft)
  const pins = Math.ceil(perim / 2);

  document.getElementById('grossSqFt').textContent = grossSqFt.toLocaleString();
  document.getElementById('rollsText').textContent = `≈ ${rolls} Rolls of 10ft × 100ft (1,000 sq ft each)`;
  document.getElementById('tapeRolls').textContent = `${tapeRolls} Rolls (180ft)`;
  document.getElementById('pinsCount').textContent = `${pins} Pins (24" O.C.)`;
  document.getElementById('floorArea').textContent = `${Math.round(floorArea)} sq ft`;
  document.getElementById('wallArea').textContent = `${Math.round(wallArea)} sq ft`;
  document.getElementById('pierArea').textContent = `${Math.round(pierArea)} sq ft`;
}
window.addEventListener('DOMContentLoaded', init);
