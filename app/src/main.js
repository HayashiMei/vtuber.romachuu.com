import Vue from 'vue';
import '../scss/index.scss';

Vue.config.debug = true;

(async () => {
  const App = (await import('./App.vue')).default;

  new Vue({
    el: '#app',
    render: h => h(App),
  });
})();
