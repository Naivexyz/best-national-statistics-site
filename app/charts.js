// Hand-drawn SVG charts as strings: a line for long trends, bars for years and paired
// events, a donut for shares. No library — a national statistics site should load fast.

const INK = '#1f2733';
const SOFT = '#5b6572';
const INDIGO = '#22386e';
const VERMILLION = '#c73e2e';
const TEAL = '#2e7d74';
const GOLD = '#b98a1f';
const GRID = '#e0dac9';

function axes(width, height, padL, padB, max, formatY) {
  const plotH = height - padB - 14;
  const y = (v) => 14 + plotH - (v / max) * plotH;
  let out = '';
  for (let i = 0; i <= 4; i++) {
    const v = (max / 4) * i, yy = y(v);
    out += `<line x1="${padL}" y1="${yy}" x2="${width - 10}" y2="${yy}" stroke="${GRID}"/>`;
    out += `<text x="${padL - 6}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${SOFT}">${formatY(v)}</text>`;
  }
  return { out, y, plotH };
}

export function lineChart(series, { width = 640, height = 300, color = INDIGO, unit = '', label = '' } = {}) {
  const max = Math.max(...series.map((p) => p.value)) * 1.08;
  const min = Math.min(0, Math.min(...series.map((p) => p.value)) * 1.08);
  const padL = 46, padB = 26;
  const plotW = width - padL - 10, plotH = height - padB - 14;
  const xMin = series[0].year, xMax = series[series.length - 1].year;
  const x = (yr) => padL + ((yr - xMin) / (xMax - xMin)) * plotW;
  const y = (v) => 14 + plotH - ((v - min) / (max - min)) * plotH;
  let out = `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">`;
  for (let i = 0; i <= 4; i++) {
    const v = min + ((max - min) / 4) * i, yy = y(v);
    out += `<line x1="${padL}" y1="${yy}" x2="${width - 10}" y2="${yy}" stroke="${GRID}"/>`;
    out += `<text x="${padL - 6}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${SOFT}">${Math.round(v * 10) / 10}${unit}</text>`;
  }
  const points = series.map((p) => `${x(p.year)},${y(p.value)}`).join(' ');
  out += `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>`;
  series.forEach((p) => {
    out += `<circle cx="${x(p.year)}" cy="${y(p.value)}" r="3.5" fill="${color}"><title>${p.year}: ${p.value}${unit}</title></circle>`;
    out += `<text x="${x(p.year)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${INK}">${p.year}</text>`;
  });
  const last = series[series.length - 1];
  out += `<text x="${x(last.year)}" y="${y(last.value) - 12}" text-anchor="end" font-size="13" font-weight="700" fill="${color}">${last.value}${unit}</text>`;
  return out + '</svg>';
}

export function barChart(series, { width = 640, height = 300, color = INDIGO, unit = '', label = '' } = {}) {
  const max = Math.max(...series.map((p) => p.value)) * 1.12;
  const padL = 46, padB = 26;
  const { out: grid, y, plotH } = axes(width, height, padL, padB, max, (v) => `${Math.round(v * 10) / 10}${unit}`);
  const plotW = width - padL - 10;
  const groupW = plotW / series.length;
  const barW = Math.min(38, groupW * 0.55);
  let out = `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">` + grid;
  series.forEach((p, i) => {
    const cx = padL + groupW * i + groupW / 2;
    out += `<rect x="${cx - barW / 2}" y="${y(p.value)}" width="${barW}" height="${14 + plotH - y(p.value)}" rx="3" fill="${color}"><title>${p.year}: ${p.value}${unit}</title></rect>`;
    out += `<text x="${cx}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${INK}">${p.year}</text>`;
  });
  return out + '</svg>';
}

export function pairedBars(rows, { width = 640, height = 300, label = '' } = {}) {
  const max = Math.max(...rows.flatMap((r) => [r.births, r.deaths])) * 1.12;
  const padL = 46, padB = 26;
  const { out: grid, y, plotH } = axes(width, height, padL, padB, max, (v) => `${Math.round(v)}k`);
  const plotW = width - padL - 10;
  const groupW = plotW / rows.length;
  const barW = Math.min(22, groupW / 3.2);
  let out = `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">` + grid;
  rows.forEach((r, i) => {
    const cx = padL + groupW * i + groupW / 2;
    out += `<rect x="${cx - barW - 2}" y="${y(r.births)}" width="${barW}" height="${14 + plotH - y(r.births)}" rx="3" fill="${TEAL}"><title>${r.year} births: ${r.births}k</title></rect>`;
    out += `<rect x="${cx + 2}" y="${y(r.deaths)}" width="${barW}" height="${14 + plotH - y(r.deaths)}" rx="3" fill="${VERMILLION}"><title>${r.year} deaths: ${r.deaths}k</title></rect>`;
    out += `<text x="${cx}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${INK}">${r.year}</text>`;
  });
  return out + '</svg>';
}

const DONUT_COLORS = ['#22386e', '#c73e2e', '#2e7d74', '#b98a1f', '#5b7d99'];

export function donutChart(entries, size = 300, centerLabel = '') {
  const total = entries.reduce((s, e) => s + e.value, 0);
  const cx = size / 2, cy = size / 2, r = size / 2 - 8, inner = r * 0.58;
  let angle = -Math.PI / 2;
  let out = `<svg class="chart" viewBox="0 0 ${size} ${size}" role="img" aria-label="${centerLabel}" style="max-width:${size}px;margin:0 auto">`;
  entries.forEach((e, i) => {
    const sweep = (e.value / total) * Math.PI * 2;
    const a0 = angle, a1 = angle + sweep;
    angle = a1;
    const large = sweep > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    out += `<path d="M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} L ${xi1} ${yi1} A ${inner} ${inner} 0 ${large} 0 ${xi0} ${yi0} Z" fill="${DONUT_COLORS[i % DONUT_COLORS.length]}" stroke="#f7f4ee" stroke-width="2"><title>${e.name}: ${e.value}%</title></path>`;
  });
  out += `<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="14" fill="${SOFT}">${centerLabel}</text>`;
  return out + '</svg>';
}

export function donutLegend(entries) {
  return entries
    .map((e, i) => `<div class="legend-row"><span class="swatch" style="background:${DONUT_COLORS[i % DONUT_COLORS.length]}"></span>${e.name}<span class="legend-pct">${e.value}%</span></div>`)
    .join('');
}
