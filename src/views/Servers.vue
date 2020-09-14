<template>
    <div>
        <CRow>






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
            return {}
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
            }
        }
    }
</script>
