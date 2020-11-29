<template>
    <CContainer class="d-flex content-center min-vh-100">
        <CRow>
            <CCol>
                <CAlert color="primary" v-show="false">
                    directConnectionPossible: {{ directConnectionPossible }}<br>
                    directConnection: {{ directConnection }}<br>
                </CAlert>
                <CAlert color="danger" v-show="error !== ''">
                    <b>Error: </b> {{ error }}
                </CAlert>
                <CAlert color="warning" v-show="(directConnection === 1 && url.includes('http://')) || (directConnection === 2 && customBackendHost.includes('http://'))">
                    <b>Your connection is not secure</b>
                </CAlert>
                <CCard class="p-4">
                    <CCardBody>
                        <CForm>
                            <h1>VeniceRCON Login</h1>
                            <p class="text-muted">Please authenticate yourself</p>
                            <CSelect
                                    :options="backendHostOptions"
                                    :value.sync="directConnection"
                            >
                                <template #prepend-content><CIcon name="cil-storage"/></template>
                            </CSelect>
                            <CInput
                                    v-show="directConnection !== 1"
                                    :value.sync="customBackendHost"
                                    placeholder="Your custom server URL"
                            >
                                <template #prepend-content><CIcon name="cil-storage"/></template>
                            </CInput>
                            <CInput
                                    placeholder="Username"
                                    autocomplete="username email"
                                    :value.sync="username"
                                    @keyup.enter="login()"
                            >
                                <template #prepend-content><CIcon name="cil-user"/></template>
                            </CInput>
                            <CInput
                                    placeholder="Password"
                                    type="password"
                                    autocomplete="curent-password"
                                    :value.sync="password"
                                    @keyup.enter="login()"
                            >
                                <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                            </CInput>
                            <CRow>
                                <CCol col="6" class="text-left">
                                    <CButton color="primary" class="px-4" @click="login" :disabled="loginDisabled || (directConnection === 1 && !directConnectionPossible)">Login</CButton>
                                </CCol>
                                <CCol col="6" class="text-right">
                                    <CButton color="link" class="px-0">Forgot password?</CButton>
                                    <CButton color="link" class="d-md-none">Register now!</CButton>
                                </CCol>
                            </CRow>
                        </CForm>

                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </CContainer>
</template>

<script>

    import axios from "axios";
    import store from "../../store";

    export default {
        name: 'Login',
        data() {
            return {
                url: window.location.protocol + '//' + window.location.host + '/',
                directConnectionPossible: false,
                directConnection: 1,
                customBackendHost: '',
                username: '',
                password: '',
                error: '',
                loginDisabled: false,
                backendHostOptions: [
                    {
                        value: 1,
                        label: 'Direct connection'
                    },
                    {
                        value: 2,
                        label: 'Custom host'
                    }
                ],
            }
        },
        mounted() {
            if(this.url === "http://localhost:8080") {
                this.url = "http://localhost:8000"
                store.commit('updatePersistent', ['backendHost', this.url])
            }
            this.customBackendHost = this.$store.state.backendHost

            axios.get(this.url + 'api')
                .then((response) => {
                    if(response.headers['content-type'].includes("application/json") && response.data.name && response.data.name === "VeniceRCON-api") {
                        this.directConnectionPossible = true
                    }
                    else {
                        this.directConnectionPossible = false
                        this.error = 'Direct connection not possible'
                    }
                })
                .catch(() => {
                    this.directConnectionPossible = false
                    this.error = 'Direct connection not possible'
                })
        },
        methods: {
            login: function() {
                if(this.loginDisabled) return
                this.loginDisabled = true
                this.error = ''
                if (this.directConnection === 2) {
                    store.commit('updatePersistent', ['backendHost', this.customBackendHost])
                } else {
                    store.commit('updatePersistent', ['backendHost', this.url])
                }
                axios.post('auth/login', {username: this.username, password: this.password})
                    .then((response) => {
                        store.commit('setJwtToken', response.data.token)
                        this.loginDisabled = false
                        this.$router.push('/loading')
                        //alert("login success")
                    })
                    .catch((error) => {
                        this.loginDisabled = false
                        if(error.response) {
                            this.error = error.response.data.message
                            this.password = ''
                        } else {
                            this.error = error.message
                        }
                    })
            }
        }
    }

</script>
