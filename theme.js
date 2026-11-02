(() => {
  try { document.documentElement.dataset.theme = localStorage.getItem('levelup-theme') === 'dark' ? 'dark' : 'light'; }
  catch { document.documentElement.dataset.theme = 'light'; }
})();
