<template>
  <CContainer class="d-flex content-center min-vh-100">
    <CRow>
      <CCol>
        <CAlert color="primary">
          {{ backendHost }} {{ username }} {{ password }}
        </CAlert>
        <CAlert color="primary">
          <b>This is not a finished product</b>
        </CAlert>
          <CCard class="p-4">
            <CCardBody>
              <CForm>
                <h1>VeniceRCON Login</h1>
                <p class="text-muted">Please authenticate yourself</p>
                <CSelect
                        :options="backendHostOptions"
                        :value.sync="backendHost"
                >
                  <template #prepend-content><CIcon name="cil-storage"/></template>
                </CSelect>
                <CInput
                        v-if="backendHost == 'custom'"
                        :value.sync="customBackendHost"
                        placeholder="Your custom server URL"
                >
                  <template #prepend-content><CIcon name="cil-storage"/></template>
                </CInput>
                <CInput
                  placeholder="Username"
                  autocomplete="username email"
                  :value.sync="username"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="curent-password"
                  :value.sync="password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CRow>
                  <CCol col="6" class="text-left">
                    <CButton color="primary" class="px-4" @click="login">Login</CButton>
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
      backendHostOptions: [
        {
          value: 'https://rconcloud-api.allianceapps.io',
          label: 'AllianceApps RCON Cloud'
        },
        {
          value: 'custom',
          label: 'Custom host'
        }
      ],
      backendHost: 'https://rconcloud-api.allianceapps.io',
      customBackendHost: '',
      username: '',
      password: ''
    }
  },
  mounted() {

    this.backendHost = this.$store.state.backendHost
    if (this.$store.state.backendHost != 'https://rconcloud-api.allianceapps.io') {
      this.backendHostOptions.push({
        value: this.$store.state.backendHost,
        label: this.$store.state.backendHost
      })
    }
  },
  methods: {
      login: function() {
        if (this.backendHost == 'custom') {
          store.commit('updatePersistent', ['backendHost', this.customBackendHost])
        }
        axios.post('auth/login', {username: this.username, password: this.password})
          .then((response) => {
            store.commit('setJwtToken', response.data.token)
            this.$router.push('/loading')
          })
          .catch(() => {
            alert("We couldnt log you in because fuck you")
          })
      }
  }
}

</script>
