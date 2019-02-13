if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js', { scope: '' }).then(() => {
      const logPrefix = ['%cService Worker', `background: #995500; color: white; padding: 2px 0.5em; ` + `border-radius: 0.5em;`];
      console.log(...logPrefix, '注册好啦(/≧▽≦/)');
    });
  });
}
