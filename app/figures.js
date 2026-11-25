// Small computations over the dataset: changes between years, shares and rankings.
// Views ask here so a number is derived the same way wherever it appears.

export function changeBetween(series, fromYear, toYear) {
  const from = series.find((p) => p.year === fromYear);
  const to = series.find((p) => p.year === toYear);
  if (!from || !to) return null;
  const abs = Math.round((to.value - from.value) * 10) / 10;
  const pct = Math.round((abs / from.value) * 1000) / 10;
  return { abs, pct };
}

export function peakOf(series) {
  return series.reduce((best, p) => (p.value > best.value ? p : best), series[0]);
}

export function formatMetric(value, format) {
  if (format === 'money') return '$' + Math.round(value).toLocaleString('en-US');
  return String(value);
}

// Rank countries by one metric, highest first, with each value as a share of the leader's.
export function rankBy(countries, metricId) {
  const max = Math.max(...countries.map((c) => c[metricId]));
  return [...countries]
    .sort((a, b) => b[metricId] - a[metricId])
    .map((c) => ({ ...c, share: Math.round((c[metricId] / max) * 100) }));
}
