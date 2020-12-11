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
                plugins: []
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
            installPlugin(store, name) {
                axios.post('instances/' + this.$route.params.id + '/plugins/store' + store + '/' + name)
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Plugin downloaded',
                            duration: 5000,
                            text: name + ' has been downloaded'
                        });
                        this.loadPluginsFromStore()
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
