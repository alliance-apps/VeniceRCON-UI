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
            //this.$store.commit('set', ['loaded', true])
            if(this.$store.state.loaded) this.$router.push('/dashboard')
            console.log(this.$store.state.loaded)

            if (store.state.jwt === null) {
                this.$router.push('/login')
            } else {
                axios.get('auth/whoami')
                    .then((response) => {
                        store.commit('set', ['user', response.data.token])
                        store.commit('set', ['permissions', response.data.permissions])
                        store.commit('set', ['loaded', true])
                        store.commit('set', ['authorized', true])
                        if (this.$route.query.redirect) this.$router.push(this.$route.query.redirect)
                        else this.$router.push('/dashboard')
                    })
                    .catch(() => {
                        store.commit('set', ['authorized', false])
                        store.commit('setJwtToken', null)
                        this.$router.push('/login')
                    })


                const socket = io.connect(store.state.backendHost, { query: `auth_token=${store.state.jwt}`})
                socket.on("error", err => console.log(err))
                socket.on("INSTANCE#ADD", event => {
                    this.$store.commit("setObjectProp", ["instances", event.state.id, event.state])
                    console.log("got added to instance", event.state)
                })
                socket.on("INSTANCE#UPDATE", event => {
                    this.$store.commit("lodashSet", ["instances", event])
                    //console.log(`received updates for instance with id ${event.id}`, event.changes)
                })
                socket.on("INSTANCE#REMOVE", event => {
                    console.log(`removed from instance ${event.id}`)
                })
            }
        },

    }
</script>
