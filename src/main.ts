import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js').then((registration: any) => {
      console.log('SW registered: ', registration)
    }).catch((registrationError: any) => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}
