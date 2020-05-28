import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex)

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
  instances: [],
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
  serverInfoUpdate(state, update) {
    let serverid = update.id
    let tmp = state.instances[serverid - 1].serverinfo
    console.log(tmp)
    tmp[update.name] = update.value
    console.log("updating " + (serverid - 1) + " " + update.name)
  }
}

const actions = {
  //"SOCKET_instance"() {
  //  console.log("we received sth")
  //}

}



const getters = {
  getServers: state => {
    axios.get('instances')
        .then((response) => {
          state.instances = response.data
          return response.data
        })
        .catch(() => {
          console.log("request error for instances")
        })
  }
}


export default new Vuex.Store({
  getters,
  state,
  mutations,
  //actions
})