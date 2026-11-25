// The five pages of Japan in Numbers, each a function from the dataset to an HTML string.
// Every figure is shown with the source and year it is known by.

import {
  KEY_INDICATORS, POPULATION_TREND, AGE_STRUCTURE, PREFECTURES, VITAL_EVENTS,
  GDP_TREND, GDP_SECTORS, INFLATION, LIFE_EXPECTANCY, SOCIETY_FACTS, COMPARISON,
} from './data.js';
import { changeBetween, peakOf } from './figures.js';
import { lineChart, barChart, pairedBars, donutChart, donutLegend } from './charts.js';

function indicatorCard(k) {
  return `<div class="card">
    <p class="label">${k.label}</p>
    <p class="figure">${k.value}</p>
    <p class="sub">${k.detail}</p>
    <span class="source">${k.source} · ${k.year}</span>
  </div>`;
}

export function overviewView() {
  const peak = peakOf(POPULATION_TREND);
  const fall = changeBetween(POPULATION_TREND, 2008, 2023);
  return `
  <div class="lede">
    <p class="kicker">National statistics · Japan</p>
    <h1>A country of 124 million, in eight numbers</h1>
    <p>Japan is the world's oldest large country and its fourth-largest economy. Start with the
    headline indicators, then follow the sections above: <a href="#/population">population</a>,
    <a href="#/economy">economy</a>, <a href="#/society">society</a>, and a
    <a href="#/compare">comparison</a> with five other countries. Every figure names its source and year.</p>
  </div>
  <div class="cards">${KEY_INDICATORS.map(indicatorCard).join('')}</div>

  <h2 class="section">The story in one chart</h2>
  <div class="card chart-card">
    <h3>Population, 1960 to 2023</h3>
    <p class="chart-sub">Sixty years of growth, a peak of ${peak.value} million in ${peak.year}, then a decline of
    ${Math.abs(fall.abs)} million (${fall.pct}%) by 2023 — the turn that shapes everything else on this site.
    Source: World Bank.</p>
    ${lineChart(POPULATION_TREND, { unit: 'M', label: 'Population of Japan, millions', floor: 80 })}
  </div>

  <h2 class="section">Go deeper</h2>
  <div class="cards">
    <div class="card"><p class="label">Population</p><p class="sub" style="margin-top:0.4rem">An ageing, shrinking country: the age pyramid, the biggest prefectures, and the births-versus-deaths gap that opened in 2007 and never closed.</p><p><a href="#/population">Population →</a></p></div>
    <div class="card"><p class="label">Economy</p><p class="sub" style="margin-top:0.4rem">Three decades of a yen-denominated giant measured in dollars: GDP since 1995, what the economy makes, and the return of inflation.</p><p><a href="#/economy">Economy →</a></p></div>
    <div class="card"><p class="label">Society</p><p class="sub" style="margin-top:0.4rem">The longest lives in the world, small households, late marriages and a highly educated young generation.</p><p><a href="#/society">Society →</a></p></div>
    <div class="card"><p class="label">Compare</p><p class="sub" style="margin-top:0.4rem">Japan against the United States, Germany, France, the United Kingdom and South Korea — pick a measure and the table re-ranks itself.</p><p><a href="#/compare">Compare →</a></p></div>
  </div>`;
}

export function populationView() {
  return `
  <div class="lede">
    <p class="kicker">Population</p>
    <h1>Older, fewer, more concentrated</h1>
    <p>Japan's population peaked at 128.1 million in 2008 and has fallen every year since, to about
    124.4 million in 2023. Deaths have outnumbered births since 2007; in 2024 the gap was about
    900,000 people. What growth remains gathers in Tokyo and the big city regions.</p>
  </div>
  <div class="card chart-card" style="margin-bottom:0.9rem">
    <h3>Population, 1960 to 2023 (millions)</h3>
    <p class="chart-sub">The long rise, the 2008 peak of 128.1 million, and the decline since — about 550,000 people a year
    in the most recent years, roughly a city the size of Kobe every three years. Source: World Bank.</p>
    ${lineChart(POPULATION_TREND, { unit: 'M', label: 'Population of Japan, millions', floor: 80 })}
  </div>
  <div class="split">
    <div class="card chart-card">
      <h3>Age structure, 2023</h3>
      <p class="chart-sub">Nearly three in ten people are 65 or older — up from one in twenty in 1960. Source: Statistics Bureau of Japan.</p>
      ${donutChart(AGE_STRUCTURE, 300, '2023')}
    </div>
    <div class="card">
      <h3 style="margin-top:0">The shares</h3>
      ${donutLegend(AGE_STRUCTURE)}
      <p class="chart-sub" style="margin-top:0.8rem">The working-age share (59.5%) now supports the rest at a ratio of about
      1.7 to 1 — the arithmetic behind Japan's pension and care debates.</p>
    </div>
  </div>

  <h2 class="section">Births and deaths</h2>
  <div class="card chart-card">
    <h3>Fewer births, more deaths, every year</h3>
    <p class="chart-sub">Registered births and deaths, in thousands. Births fell below one million in 2016 and to about
    721,000 in 2024; deaths rose to about 1.62 million as the post-war generation reaches old age.
    Source: Ministry of Health, Labour and Welfare, preliminary counts.</p>
    ${pairedBars(VITAL_EVENTS, { label: 'Births and deaths in Japan, thousands' })}
    <div class="legend"><span><span class="swatch" style="background:#2e7d74"></span>Births</span><span><span class="swatch" style="background:#c73e2e"></span>Deaths</span></div>
  </div>

  <h2 class="section">The largest prefectures</h2>
  <table class="stats">
    <thead><tr><th>Prefecture</th><th class="num">Population (millions)</th><th class="hide-phone">Note</th></tr></thead>
    <tbody>${PREFECTURES.map((p) => `<tr><td><strong>${p.name}</strong></td><td class="num">${p.population.toFixed(2)}</td><td class="hide-phone">${p.note}</td></tr>`).join('')}</tbody>
  </table>
  <p class="chart-sub" style="margin-top:0.5rem">Statistics Bureau of Japan estimates, October 2023. The top three prefectures alone hold about a quarter of the country.</p>`;
}

export function economyView() {
  return `
  <div class="lede">
    <p class="kicker">Economy</p>
    <h1>Big, rich, and priced in a weaker yen</h1>
    <p>Measured in dollars, Japan's GDP swings with the exchange rate: a peak of about $5.8 trillion in
    2010–2012, then a fall as the yen weakened, to $4.21 trillion in 2023 — still the world's
    fourth-largest economy. In yen terms output has grown slowly but steadily.</p>
  </div>
  <div class="card chart-card">
    <h3>GDP, 1995 to 2023 (trillion US dollars)</h3>
    <p class="chart-sub">Nominal GDP converted at market exchange rates — the chart is as much a history of the yen as of output. Source: World Bank.</p>
    ${barChart(GDP_TREND, { unit: '', label: 'GDP of Japan, trillion dollars' })}
  </div>
  <div class="split" style="margin-top:0.9rem">
    <div class="card chart-card">
      <h3>What the economy makes</h3>
      <p class="chart-sub">Shares of gross value added, about 2022. Manufacturing is a far bigger slice than in most rich countries. Source: Cabinet Office / World Bank.</p>
      ${donutChart(GDP_SECTORS, 280, 'value added')}
    </div>
    <div class="card">
      <h3 style="margin-top:0">The shares</h3>
      ${donutLegend(GDP_SECTORS)}
      <h3 style="margin:1rem 0 0.3rem">Trade in brief</h3>
      <p class="sub">Exports of goods were about <strong>$786 billion</strong> and imports about <strong>$897 billion</strong> in 2023 —
      energy and food in, cars, machinery and chips out. The largest partners are the United States and China.
      <span class="source">Ministry of Finance · 2023</span></p>
      <h3 style="margin:1rem 0 0.3rem">Public debt</h3>
      <p class="sub">Gross government debt is about <strong>255% of GDP</strong>, the highest among advanced economies,
      held mostly by domestic savers and the central bank. <span class="source">IMF · 2023</span></p>
    </div>
  </div>
  <h2 class="section">Inflation came back</h2>
  <div class="card chart-card">
    <h3>Consumer price inflation, per cent a year</h3>
    <p class="chart-sub">After two decades when prices barely moved — and sometimes fell — inflation rose above 3% in 2023,
    driven by import costs and a weak yen, then eased to 2.7% in 2024. Source: Statistics Bureau of Japan.</p>
    ${lineChart(INFLATION, { unit: '%', color: '#c73e2e', label: 'Inflation in Japan, per cent' })}
  </div>`;
}

export function societyView() {
  return `
  <div class="lede">
    <p class="kicker">Society</p>
    <h1>Long lives, small households</h1>
    <p>The social statistics behind the headlines: the world's longest-lived people, households of
    2.2 on average, marriages later and rarer, and a young generation among the best educated anywhere.</p>
  </div>
  <div class="card chart-card">
    <h3>Life expectancy at birth, 1960 to 2022</h3>
    <p class="chart-sub">Sixteen extra years of life since 1960. The small dip in 2021–22, the first in decades, followed the
    pandemic years. Source: World Bank.</p>
    ${lineChart(LIFE_EXPECTANCY, { unit: '', color: '#2e7d74', label: 'Life expectancy in Japan, years', floor: 50 })}
  </div>
  <h2 class="section">Society in figures</h2>
  <div class="cards">
    ${SOCIETY_FACTS.map((f) => `<div class="card"><p class="label">${f.label}</p><p class="figure">${f.value}</p><p class="sub">${f.detail}</p><span class="source">${f.source} · ${f.year}</span></div>`).join('')}
  </div>
  <div class="card" style="margin-top:0.9rem">
    <h3 style="margin-top:0">Reading these together</h3>
    <p style="margin-bottom:0">Long lives plus few births is the whole demographic story: a fertility rate of 1.20 against a
    life expectancy of 84 means each generation is roughly two-thirds the size of the one before.
    The other figures are how society adapts — smaller households, later marriage, more education,
    and working lives that stretch longer even as yearly hours fall.</p>
  </div>`;
}

export function compareView() {
  const options = COMPARISON.metrics.map((m) => `<option value="${m.id}">${m.label}</option>`).join('');
  return `
  <div class="lede">
    <p class="kicker">Compare</p>
    <h1>Japan among six countries</h1>
    <p>The same measures for Japan and five peers. Choose a measure and the table re-ranks itself,
    Japan highlighted. All figures are for 2023 (life expectancy 2022, median age UN estimates),
    from the World Bank unless noted, rounded.</p>
  </div>
  <div class="controls">
    <div class="field"><label for="metricSelect">Rank by</label><select id="metricSelect">${options}</select></div>
  </div>
  <table class="stats">
    <thead><tr><th>#</th><th>Country</th><th class="num" id="metricHead"></th><th style="width:38%">Share of the leader</th></tr></thead>
    <tbody id="compareBody"></tbody>
  </table>
  <p class="chart-sub" style="margin-top:0.5rem">Japan leads this group on life expectancy and median age, sits mid-table on output per person, and —
  unusually for a large economy — recorded the group's second-lowest inflation in 2023.</p>`;
}
