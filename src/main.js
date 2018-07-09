// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import { sync } from 'vuex-router-sync'
import router from './router'
import axios from 'axios'
import store from './store'
require('./mock/index.js')
// const unsync = sync(store, router) // done. Returns an unsync callback fn
// unsync();
// import DialogComponent from './components/dialog/index.js'
// console.log(DialogComponent);
// Vue.use(DialogComponent)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  axios,
  components: { App },
  template: '<App/>'
})
