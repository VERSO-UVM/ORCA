/* ORCA Static Site — onboarding.js
   The path picker, task links and "Copy link" for the Onboarding section.
   Without JavaScript the picker stays hidden and every task shows. */

(() => {
  const form = document.getElementById('ob-picker');
  const tasks = [...document.querySelectorAll('.ob-task')];
  if (!form || !tasks.length) return;

  const groups = [...document.querySelectorAll('.ob-group')];
  const count = document.getElementById('ob-count');
  const announce = document.getElementById('ob-announce');
  const showAll = document.getElementById('ob-show-all');
  const STORE = 'orca-onboarding-path';
  let everything = false;
  let pinned = null; // a task opened from a link stays visible even if the path hides it

  const hours = (m) => {
    const h = Math.round(m / 30) / 2;
    return h === 1 ? 'about 1 hour' : `about ${h} hours`;
  };

  const state = () => ({
    status: form.querySelector('input[name="ob-status"]:checked')?.value || 'new',
    lead: form.querySelector('input[name="ob-lead"]').checked,
    areas: [...form.querySelectorAll('input[name="ob-area"]:checked')].map((i) => i.value),
  });

  const fits = (task, s) => {
    const d = task.dataset;
    if (d.status === 'retired') return false;
    if (!d.for.split(' ').includes(s.status)) return false;
    if (d.lead === 'true' && !s.lead) return false;
    const areas = d.areas.split(' ');
    return areas.includes('all') || areas.some((a) => s.areas.includes(a));
  };

  const update = () => {
    const s = state();
    let shown = 0;
    let minutes = 0;
    tasks.forEach((task) => {
      const show = everything || fits(task, s) || task === pinned;
      task.hidden = !show;
      if (show) {
        shown += 1;
        minutes += Number(task.dataset.minutes) || 0;
      }
    });
    groups.forEach((g) => { g.hidden = !g.querySelector('.ob-task:not([hidden])'); });
    count.textContent = everything
      ? `Showing all ${shown} tasks.`
      : `Showing ${shown} tasks on your path, ${hours(minutes)} in all.`;
    showAll.textContent = everything ? 'Show only my path' : 'Show every task';
    try { localStorage.setItem(STORE, JSON.stringify(s)); } catch (e) { /* private mode */ }
  };

  const restore = () => {
    try {
      const s = JSON.parse(localStorage.getItem(STORE) || 'null');
      if (!s) return;
      form.querySelectorAll('input[name="ob-status"]').forEach((i) => { i.checked = i.value === s.status; });
      form.querySelector('input[name="ob-lead"]').checked = !!s.lead;
      form.querySelectorAll('input[name="ob-area"]').forEach((i) => { i.checked = s.areas.includes(i.value); });
    } catch (e) { /* ignore a bad saved value */ }
  };

  // Open the task named in the address, such as #ob-core-03.
  const openFromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id.startsWith('ob-')) return;
    const task = document.getElementById(id);
    if (!task || !task.classList.contains('ob-task')) return;
    pinned = task;
    update();
    task.open = true;
    task.scrollIntoView({ block: 'start', behavior: 'instant' });
    task.querySelector('summary').focus({ preventScroll: true });
  };

  // Images above the section can finish loading after the jump and push the
  // task down, so jump again once the page has loaded.
  const settle = () => { if (pinned) pinned.scrollIntoView({ block: 'start', behavior: 'instant' }); };

  form.addEventListener('change', () => { pinned = null; update(); });
  form.addEventListener('submit', (e) => e.preventDefault());
  showAll.addEventListener('click', () => { everything = !everything; update(); });

  document.querySelectorAll('.ob-copy').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = link.getAttribute('href');
      const url = location.origin + location.pathname + hash;
      history.replaceState(null, '', hash);
      const done = (msg) => {
        const label = link.textContent;
        link.textContent = msg;
        announce.textContent = msg;
        setTimeout(() => { link.textContent = label; announce.textContent = ''; }, 2500);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => done('Link copied'), () => done('Copy the link from the address bar'));
      } else {
        done('Copy the link from the address bar');
      }
    });
  });

  window.addEventListener('hashchange', openFromHash);

  restore();
  form.hidden = false;
  update();
  openFromHash();
  if (document.readyState === 'complete') settle();
  else window.addEventListener('load', settle, { once: true });
})();
