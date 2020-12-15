import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex)
//var _ = require('lodash');
import router from "./router";


let deep_value = function(obj, path){
  for (var i=0, path2=path.split('.'), len=path.length; i<len; i++){
    if(obj[path2[i]])
      obj = obj[path2[i]];
    else {
      Vue.set(obj, path2[i], {})
      obj = obj[path2[i]];
    }
  }
  return obj;
};

const state = {
  loaded: false,
  authorized: false,
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  customBackend: localStorage.getItem('customBackend') || 'https://',
  directConnection: localStorage.getItem('directConnection') ? parseInt(localStorage.getItem('directConnection')) : 1,
  directConnectionUrl: null,
  jwt: localStorage.getItem('jwt'),
  user: null,
  email: '',
  globalPermissions: [],
  permissions: {},
  instances: {},
  chats: {}
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
    if(variable === 'customBackend') {
      value = value.replace(/\/$/, "")
      axios.defaults.baseURL = value + '/api/'
    }

    Vue.set(state, variable, value)
    localStorage.setItem(variable, value)
  },
  setJwtToken(state, token) {
    state.jwt = token
    axios.defaults.headers.common = {'Authorization': 'Bearer ' + token}
    localStorage.setItem('jwt', token)
  },
  set (state, [variable, value]) {
    Vue.set(state, variable, value)
  },
  setObjectProp (state, [variable, prop, value]) {
    Vue.set(state[variable], prop, value)
  },
  lodashSet (state, [variable, event]) {
    event.changes.forEach(change => {
      let pos = change[0].lastIndexOf('.')
      let prepath = change[0].substring(0,pos)
      //console.log(prepath)
      let postpath = change[0].substring(pos+1)
      let target = state[variable][event.id]
      if(prepath !== "") target = deep_value(target, prepath)
      //console.log("prepath " + prepath + " - postpath " + postpath)

      if(change[1] === null) Vue.set(target, postpath, undefined)
      else Vue.set(target, postpath, change[1])

      if(prepath.includes("players.")) {
        Vue.set(state[variable][event.id], "playersArray", [])
        Vue.set(state[variable][event.id], "playersArray", JSON.parse(JSON.stringify(Object.values(state.instances[event.id].players))))
      }

      if(postpath == "state" && router.currentRoute.params.id) {
        router.push('/servers')
      }
    })
  },
  receiveChat(state, event) {
    for(let i = 0; i < event.messages.length; i++) {
      let chat = event.messages[i]
      if(!state.chats[chat.instance]) Vue.set(state.chats, chat.instance, [])
      //if(!state.chats[chat.instance].chats) state.chats[chat.instance].chats = []
      chat.created = new Date(chat.created)
      state.chats[chat.instance].push(chat)
      state.chats[chat.instance].sort(function(a, b) {
        return b.id - a.id
      })
      //if(state.chats[chat.instance].length > 50) {
      //  state.chats[chat.instance].shift()
      //}
      //console.log(event.messages[i])
    }
  },
  setPermissions(state, permissions) {
    for(const permission of permissions) {
      if(permission.root && permission.instance === null) {
        Vue.set(state, "globalPermissions", permission.scopes)
      } else {
        Vue.set(state.permissions, permission.instance, permission.scopes)
      }
    }

  }
}




const getters = {
  hasPermission: (state) => (permission, id) => {
    if(state.globalPermissions.includes(permission)) {
      //console.log("User does have permission")
      return true;
    }

    else if(id && state.permissions[id]) {
      if(state.permissions[id].includes(permission)) {
        //alert("User does have permission")
        return true;
      }
    }
    //console.log("User does NOT have permission " + permission + " alt " + id)
    return false;
  },
  hasInstanceUserPermissions: (state) => () => {
    const instanceUserAccesPermission = 'INSTANCEUSER#ACCESS'
    if(state.globalPermissions.includes(instanceUserAccesPermission)) return true
    for(let key in state.permissions) {
      if(state.permissions[key].includes(instanceUserAccesPermission)) return true
    }
    return false
  }
}


export default new Vuex.Store({
  getters,
  state,
  mutations,
  //actions
})