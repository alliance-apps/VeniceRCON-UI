<template>
    <CContainer class="d-flex align-items-center min-vh-100">
        <h4 class="pt-3">Loading...</h4>
    </CContainer>
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
                    alert("We have lost websocket connection. Please reload.")
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
            }
        },

    }
</script>
