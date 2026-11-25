// Japan in Numbers' engine room: routes the five pages by the URL hash and wires the
// comparison page's re-ranking control. Everything renders from the dataset in data.js.

import { COMPARISON } from './data.js';
import { formatMetric, rankBy } from './figures.js';
import { overviewView, populationView, economyView, societyView, compareView } from './views.js';

const app = document.getElementById('app');

const VIEWS = {
  '': overviewView,
  population: populationView,
  economy: economyView,
  society: societyView,
  compare: compareView,
};

function route() {
  return location.hash.replace(/^#\/?/, '').split('?')[0];
}

function render() {
  const r = route();
  const view = VIEWS[r] ?? overviewView;
  app.innerHTML = view();
  document.querySelectorAll('.site-nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === (VIEWS[r] ? r : ''));
  });
  if (r === 'compare') wireCompare();
  window.scrollTo(0, 0);
}

/* ---------- compare page: pick a measure, the table re-ranks ---------- */

function wireCompare() {
  const select = document.getElementById('metricSelect');
  const head = document.getElementById('metricHead');
  const body = document.getElementById('compareBody');

  function draw() {
    const metric = COMPARISON.metrics.find((m) => m.id === select.value) ?? COMPARISON.metrics[0];
    head.textContent = metric.label;
    const ranked = rankBy(COMPARISON.countries, metric.id);
    body.innerHTML = ranked
      .map((c, i) => `<tr class="${c.name === 'Japan' ? 'highlight' : ''}">
        <td>${i + 1}</td>
        <td>${c.name}</td>
        <td class="num">${formatMetric(c[metric.id], metric.format)}</td>
        <td><span class="rankbar" style="width:${Math.max(4, c.share * 1.6)}px"></span>${c.share}%</td>
      </tr>`)
      .join('');
  }

  select.addEventListener('change', draw);
  draw();
}

window.addEventListener('hashchange', render);
render();
