<template>
    <div>
        <CRow>
            <CCol sm="6">
                <CButton
                        @click="createServerModal = true"
                        color="success"
                >
                    Add server
                </CButton>
            </CCol>
        </CRow>
        <br>
        <CRow>

            <CModal
                    title="Add server"
                    color="success"
                    :show.sync="createServerModal"
            >
                <CAlert color="warning" v-if="newServer.error">
                    {{ newServer.error }}
                    <div v-if="newServer.error.includes('ENOTFOUND')">
                        The specified hostname could not be found (DNS error)
                    </div>
                    <div v-if="newServer.error.includes('ECONNREFUSED')">
                        Connection to port refused by firewall/NAT
                    </div>
                </CAlert>
                <CRow>
                    <CCol sm="8">
                        <CInput
                                label="Hostname or IPv4 address"
                                :value.sync="newServer.host"
                        />
                    </CCol>
                    <CCol sm="4">
                        <CInput
                                label="Port"
                                type="number"
                                :value.sync="newServer.port"
                        />
                    </CCol>
                </CRow>
                <CInput
                        label="Password"
                        :value.sync="newServer.password"
                />
                <template #footer="{}">
                    <CButton
                            color="primary"
                            @click="addServer()"
                            :disabled="!addServerInputValidator() || newServer.trying"
                    >
                        <CSpinner color="secondary" size="sm" v-if="newServer.trying"/>
                        Add server
                    </CButton>
                </template>
            </CModal>

            {{ $store.state.instances }}

            <CCol sm="6" v-for="(instance, key) in $store.state.instances">
                <CCard v-if="instance">
                    <CCardHeader :color="serverBoxColour(instance.state)">
                        <slot name="header">
                            <CIcon name="cil-storage"/> <b>#{{ instance.id }} | {{ instance.serverinfo.name || instance.host}}</b>

                        </slot>
                    </CCardHeader>
                    <CCardBody>
                        <CListGroup>
                            <CListGroupItem>
                                {{ instance.serverinfo.slots || 0 }}/{{ instance.serverinfo.totalSlots || 0 }} players
                            </CListGroupItem>
                            <CListGroupItem v-if="instance.state == 2">
                                {{ $bf3_getMapDisplayName(instance.serverinfo.map) }} | {{ $bf3_getGamemodeDisplayName(instance.serverinfo.mode) }}
                            </CListGroupItem>
                            <CListGroupItem v-else>
                                Not connected
                                <span v-if="instance.state == 0"> | State unknown</span>
                                <span v-if="instance.state == 1"> | Trying to connect...</span>
                                <span v-if="instance.state == 3"> | Disconnecting...</span>
                                <span v-if="instance.state == 5"> | Trying to reconnect...</span>
                            </CListGroupItem>
                            <CListGroupItem>
                                <router-link :to="key + '/dashboard'" v-if="instance.state == 2">
                                    <CButton
                                            color="primary"
                                            block
                                    >
                                        SELECT
                                    </CButton>
                                </router-link>
                                <CButton
                                        v-else
                                        color="secondary"
                                        block
                                        @click="connect(instance.id)"
                                >
                                    CONNECT
                                </CButton>

                            </CListGroupItem>
                        </CListGroup>
                    </CCardBody>
                </CCard>
            </CCol>

        </CRow>



    </div>
</template>

<script>

    import axios from "axios";

    export default {
        name: 'Servers',
        components: {


        },
        data () {
            return {
                createServerModal: false,
                newServer: {
                    host: "",
                    port: 47200,
                    password: "",
                    trying: false,
                    error: null,
                }
            }
        },
        methods: {
            serverBoxColour(state) {
                if(state == 2) return "success"
                else return "danger"
            },
            connect(instance_id) {
                axios.patch('instances/' + instance_id + '/start', {})
                    .then((response) => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Connection successful',
                            duration: 5000,
                            text: 'You can now interact with this server...'
                        });
                    })
                    .catch((error) => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Connection failed',
                            duration: 5000,
                            text: 'Unable to connect to this server<br>' + error.response.data.message
                        });
                    })
            },
            addServer() {
                this.newServer.trying = true
                axios.post('instances', {"host": this.newServer.host, "port": this.newServer.port, "password": this.newServer.password})
                    .then(() => {
                        this.newServer.trying = false
                        this.createServerModal = false
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Connection successful',
                            duration: 5000,
                            text: 'You can now interact with this server...'
                        });
                    })
                    .catch((error) => {
                        this.newServer.trying = false
                        if(error.response) this.newServer.error = error.response.data.message
                        else this.newServer.error = "Timeout"
                    })
            },
            addServerInputValidator() {
                if(this.newServer.port < 1024 || this.newServer.port > 65535) return false
                if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.newServer.host)) {
                    if (/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/.test(this.newServer.host)) {
                        return true
                    }
                    return false
                }
                return true
            }
        }
    }
</script>
