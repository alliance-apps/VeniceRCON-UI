import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex)
var _ = require('lodash');


var deep_value = function(obj, path){
  for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
    obj = obj[path[i]];
  };
  return obj;
};

const state = {
  loaded: false,
  authorized: false,
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  backendHost: localStorage.getItem('backendHost') || 'https://rconcloud-api.allianceapps.io',
  activeServer: localStorage.getItem('activeServer') || 0,
  jwt: localStorage.getItem('jwt'),
  user: null,
  permissions: [],
  instances: {},
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  updatePersistent (state, [variable, value]) {
    state[variable] = value
    localStorage.setItem(variable, value)

    if(variable === 'backendHost') {
      axios.defaults.baseURL = value + '/api/'
    }
  },
  setJwtToken(state, token) {
    state.jwt = token
    axios.defaults.headers.common = {'Authorization': 'Bearer ' + token}
    localStorage.setItem('jwt', token)
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  setObjectProp (state, [variable, prop, value]) {
    Vue.set(state[variable], prop, value)
  },
  lodashSet (state, [variable, event]) {
    event.changes.forEach(change => {
      let pos = change[0].lastIndexOf('.')
      let prepath = change[0].substring(0,pos)
      let postpath = change[0].substring(pos+1)
      let target = state[variable][event.id]
      if(prepath !== "") target = deep_value(target, prepath)
      Vue.set(target, postpath, change[1])
    })
  },
}

const actions = {
  //"SOCKET_instance"() {
  //  console.log("we received sth")
  //}

}



const getters = {
  getInstances() {
    return state.instances
  }
}


export default new Vuex.Store({
  getters,
  state,
  mutations,
  //actions
})