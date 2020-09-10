import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
//import { iconsSet as icons } from './assets/icons/icons.js'
import { freeSet, flagSet } from "@coreui/icons";
import axios from 'axios';
import store from './store'

axios.defaults.baseURL = store.state.backendHost + '/api/'
axios.defaults.headers.common = {'Authorization': 'Bearer ' + localStorage.getItem('jwt')}

/*
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {

  } else {
    return Promise.reject(error);
  }
});*/


import bf3helpers from './services/bf3helpers'




Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

new Vue({
  el: '#app',
  router,
  store,
  icons: {...flagSet, ...freeSet},
  template: '<App/>',
  components: {
    App
  }
})
