<template>
    <div>
        <CCard>
            <CCardHeader>
                <CIcon name="cil-input-power"/> <b>Plugin Store</b>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol sm="4" v-for="(plugin, key) in plugins">
                        <CCard>
                            <CCardHeader>
                                <slot name="header">
                                    <b>{{ plugin.name }} ({{ plugin.version }})</b>
                                    <CButton
                                            class="float-right"
                                            color="success"
                                            square
                                            size="sm"
                                            @click="toInstall = plugin; show = true;"
                                    >
                                        Install
                                    </CButton>
                                </slot>
                            </CCardHeader>
                            <CCardBody>
                                {{ plugin.description }}<br>
                                <small>{{ plugin.uuid }}</small>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>


        <CModal
                title="Install plugin"
                :show.sync="show"
        >
            <ul>
                <li>{{ toInstall.name }}</li>
                <li>{{ toInstall.description }}</li>
                <li>Version {{ toInstall.version }} - {{ toInstall.uuid }}</li>
            </ul>
            <template #footer="{}">
                <CButton
                        color="success"
                        @click="installPlugin(toInstall.uuid)"
                >
                    Install
                </CButton>
            </template>
        </CModal>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'PluginStore',
        components: {


        },
        data () {
            return {
                plugins: [],
                show: false,
                toInstall: {}
            }
        },
        mounted() {
            this.loadPluginsFromStore()
        },
        methods: {
            loadPluginsFromStore() {
                axios.get('instances/' + this.$route.params.id + '/plugins/store')
                    .then((response) => {
                        this.plugins = response.data
                    })
                    .catch((error) => {
                        if(error.response) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Plugins could not be loaded',
                                duration: 5000,
                                text: 'Something went wrong<br>' + error.response.data.message
                            });
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Plugins could not be loaded',
                                duration: 5000,
                                text: 'Something went wrong loading plugins'
                            });
                        }
                    })
            },
            installPlugin(uuid) {
                axios.post('instances/' + this.$route.params.id + '/plugins/store/' + uuid)
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Plugin downloaded',
                            duration: 5000,
                            text: this.toInstall.name + ' has been downloaded'
                        });
                        this.$router.push('/' + this.$route.params.id + '/plugins')
                    })
                    .catch((error) => {
                        if(error.response) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Plugins not downloaded',
                                duration: 5000,
                                text: 'Something went wrong<br>' + error.response.data.message
                            });
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Plugins not downloaded',
                                duration: 5000,
                                text: 'Something went wrong'
                            });
                        }
                    })
            }
        }
    }
</script>
