(() => {
  const KEY = 'nguyenhx_theme';
  const t = document.getElementById('toggle-theme');
  if (!t) {
    if(localStorage.getItem(KEY) === 'dark'){
      document.body.classList.add('dark');
    }
    else{
      document.body.classList.remove('dark');
    }
    return;
  }

  
  t.checked = localStorage.getItem(KEY) !== 'light';
  t.onchange = () => localStorage.setItem(KEY, t.checked ? 'dark' : 'light');
})();