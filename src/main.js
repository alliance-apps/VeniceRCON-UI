import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
//import { iconsSet as icons } from './assets/icons/icons.js'
import { freeSet, flagSet } from "@coreui/icons";
import axios from 'axios';
import store from './store'


//Setting Axios defaults, checking if direct or foreign connection
axios.defaults.headers.common = {'Authorization': 'Bearer ' + localStorage.getItem('jwt')}
axios.defaults.timeout = 10000

let url = window.location.protocol + '//' + window.location.host + '/'
//axios.defaults.baseURL = url + 'api/'
if(url === "http://localhost:8080/") {
    //This is useful for debugging locally. Port 8000 and port 8080 get treated as direct connection
    console.log("Local dev environment detected")
    url = "http://localhost:8000/"
}
store.commit('set', ['directConnectionUrl', url + 'api/'])
let directionConnection = store.state.directConnection

console.log(typeof directionConnection)
console.log(directionConnection)

if(directionConnection === 1) {
    console.log("Direct connection is being used")
    axios.defaults.baseURL = url + 'api/'
} else if(directionConnection === 2) {
    let customBackend = localStorage.getItem('customBackend')
    console.log("Custom backend is being used: " + customBackend)
    if(customBackend === null) {
        store.commit('updatePersistent', ['directConnection', true])
        directionConnection = true
    } else {
        axios.defaults.baseURL = customBackend + '/api/'
    }
}

console.log("axios.defaults.baseURL = " + axios.defaults.baseURL)





axios.interceptors.request.use(function (config) {
    //console.log(config)
    if(config.baseURL.includes("localhost:8080") || config.url.includes("localhost:8080")) {
        config.baseURL = config.baseURL.replace("localhost:8080", "localhost:8000")
        config.url = config.url.replace("localhost:8080", "localhost:8000")
    }

    //config.baseURL = config.baseURL.replace('//', '/')
    if(config.baseURL.includes('//')) {
        //config.baseURL = config.baseURL.replace('//', '/')
    }
    return config
}, function () {

});


import bf3helpers from './services/bf3helpers' //Don't remove


import Notifications from 'vue-notification'
Vue.use(Notifications)



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
