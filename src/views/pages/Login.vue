<template>
    <CContainer class="d-flex content-center min-vh-100">
        <CRow>
            <CCol>
                <CAlert color="primary" v-show="true">
                    directConnectionPossible: {{ directConnectionPossible }}<br>
                    directConnection: {{ directConnection }}<br>
                    customBackend: {{ customBackend }}<br>
                    $store.state.customBackend: {{ $store.state.customBackend }}<br>
                    backupDirectConnectUrl : {{ backupDirectConnectUrl }}<br>
                </CAlert>
                <CAlert color="danger" v-show="error !== ''">
                    <b>Error: </b> {{ error }}
                </CAlert>
                <CAlert color="warning" v-show="(directConnection === 1 && url.includes('http://') && !url.includes('localhost')) || (directConnection === 2 && customBackend.includes('http://') && !customBackend.includes('localhost'))">
                    <b>Your connection is not secure</b>
                </CAlert>
                <CCard class="p-4">
                    <CCardBody>
                        <CForm>
                            <h1>VeniceRCON Login</h1>
                            <p class="text-muted" v-show="!loginDisabled">Please authenticate yourself</p>
                            <span v-show="loginDisabled">
                                <CSpinner color="primary" size="sm" />
                                <br>
                                <br>
                            </span>

                            <CSelect
                                    :options="backendHostOptions"
                                    :value.sync="directConnection"
                            >
                                <template #prepend-content><CIcon name="cil-storage"/></template>
                            </CSelect>
                            <CInput
                                    v-show="directConnection === 2"
                                    :value.sync="customBackend"
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
                                <CCol col="3" class="text-left">
                                    <CButton color="primary" class="px-4" @click="login" :disabled="loginDisabled || (directConnection === 1 && !directConnectionPossible) || password.length < 6 || username.length < 1">Login</CButton>
                                </CCol>
                                <CCol col="5" class="text-right">
                                    <CButton color="link" class="px-0">Reset password</CButton>
                                </CCol>
                                <CCol col="4" class="text-right">
                                    <CButton color="primary" class="px-4" @click="registerModal = true" >
                                        Register
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CForm>

                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

        <CModal
                title="Register account"
                color="success"
                :show.sync="registerModal"
        >
            <CInput
                    label="Token"
                    :value.sync="token"
            />
            <CInput
                    label="Confirm password"
                    type="password"
                    :value.sync="confirmPassword"
            />
            <template #footer="{}">
                <CButton
                        color="primary"
                        @click="register()"
                        :disabled="(password !== confirmPassword) || (password.length < 6) || loginDisabled"
                >
                    Create account
                </CButton>
            </template>
        </CModal>



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
                customBackend: this.$store.state.customBackend,
                directConnection: this.$store.state.directConnection,
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
                registerModal: false,
                token: '',
                confirmPassword: '',
                backupDirectConnectUrl: null
            }
        },
        mounted() {
            //this.customBackend = this.$store.state.customBackend
            //this.directConnection = this.$store.state.directConnection
            this.directConnection = this.$store.state.directConnection

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
                if (this.directConnection === 1) {
                    store.commit('updatePersistent', ['directConnection', this.directConnection])
                    if(this.backupDirectConnectUrl !== null) {
                        axios.defaults.baseURL = this.backupDirectConnectUrl
                    }
                } else if (this.directConnection === 2) {
                    this.backupDirectConnectUrl = axios.defaults.baseURL
                    store.commit('updatePersistent', ['directConnection', this.directConnection])
                    store.commit('updatePersistent', ['customBackend', this.customBackend])
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
            },
            register () {
                if(this.loginDisabled) return
                this.loginDisabled = true
                this.error = ''
                if (this.directConnection === 1) {
                    store.commit('updatePersistent', ['directConnection', this.directConnection])
                    if(this.backupDirectConnectUrl !== null) {
                        axios.defaults.baseURL = this.backupDirectConnectUrl
                    }
                } else if (this.directConnection === 2) {
                    this.backupDirectConnectUrl = axios.defaults.baseURL
                    store.commit('updatePersistent', ['directConnection', this.directConnection])
                    store.commit('updatePersistent', ['customBackend', this.customBackend])
                }
                axios.post('auth/register', {username: this.username, password: this.password, token: this.token})
                    .then((response) => {
                        store.commit('setJwtToken', response.data.token)
                        this.loginDisabled = false
                        this.$router.push('/loading')
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
                this.registerModal = false
            }
        }
    }

</script>
