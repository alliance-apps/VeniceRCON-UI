<template>
    <CSpinner
            color="primary"
            style="position: fixed;
  z-index: 999;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 50px;
  height: 50px;"

    />
</template>

<script>
    import store from "../../store";
    import axios from "axios";
    import io from "socket.io-client"



    export default {
        name: 'Loading',
        mounted() {
            if(this.$store.state.loaded) this.$router.push('/dashboard')

            if (store.state.jwt === null) {
                this.$router.push('/login')
            } else {
                axios.get('auth/whoami')
                    .then((response) => {
                        store.commit('set', ['user', response.data.token])
                        store.commit('setPermissions', response.data.permissions)
                        store.commit('set', ['loaded', true])
                        store.commit('set', ['authorized', true])
                        if (this.$route.query.redirect) this.$router.push(this.$route.query.redirect)
                        else this.$router.push('/servers')
                    })
                    .catch(() => {
                        store.commit('set', ['authorized', false])
                        store.commit('setJwtToken', null)
                        this.$router.push('/login')
                    })


                const socket = io.connect(store.state.backendHost, { query: `auth_token=${store.state.jwt}`})
                socket.on("error", () => {
                    location.reload()
                })
                socket.on("INSTANCE#ADD", event => {
                    this.$store.commit("setObjectProp", ["instances", event.state.id, event.state])
                })
                socket.on("INSTANCE#UPDATE", event => {
                    //if(event.length > 2) console.log(event)
                    this.$store.commit("lodashSet", ["instances", event])
                })
                socket.on("INSTANCE#REMOVE", event => {
                    this.$store.commit("setObjectProp", ["instances", event.state.id, undefined])
                })
                socket.on("SELF#PERMISSION_UPDATE", () => {
                    axios.get('auth/whoami')
                        .then((response) => {
                            store.commit('set', ['user', response.data.token])
                            store.commit('setPermissions', response.data.permissions)
                        })
                        .catch(() => {

                        })
                })
                socket.on("INSTANCE#CHAT", event => {
                    this.$store.commit("receiveChat", event)
                })
            }
        },

    }
</script>
