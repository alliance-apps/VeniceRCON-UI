<template>
    <div>

        <CCard>
            <CCardHeader>
                <slot name="header" >
                    {{ plugin.name }} Settings
                </slot>
                <CButton
                        class="float-right"
                        color="success"
                        square
                        size="sm"
                        @click="saveSettings()"
                        :disabled="!$store.getters.hasPermission('PLUGIN#MODIFY', $route.params.idalt)"
                >
                    Save
                </CButton>
            </CCardHeader>
            <CCardBody>
                <div v-if="plugin.meta">
                    <div v-for="variable in plugin.meta.vars" :key="variable.name">
                        <plugin-variable
                                :meta="variable"
                                :obj="plugin.config"
                        ></plugin-variable>
                    </div>
                </div>
            </CCardBody>
        </CCard>

        <CCard>
            <CCardHeader>
                <slot name="header" >
                    {{ plugin.name }}
                </slot>

            </CCardHeader>
            <CCardBody>
                <ul>
                    <li>UUID: {{ plugin.uuid }}</li>
                    <li>Store Version: {{ plugin.storeVersion }}</li>
                    <li>Store: {{ plugin.store || '-' }}</li>
                    <li v-if="plugin.meta">Description: {{ plugin.meta.description }}</li>
                </ul>

            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    import axios from "axios";
    import PluginVariable from "./plugin/PluginVariable";

    export default {
        name: 'PluginConfig',
        components: {
            PluginVariable
        },
        data () {
            return {
                plugin: {},
                test: {
                    hans: "Stringer",
                    maier: {
                        another: "Fucker"
                    }
                }
            }
        },
        mounted() {
            this.loadPlugin()
        },
        methods: {
            loadPlugin() {
                axios.get('instances/' + this.$route.params.id + '/plugins/' + this.$route.params.plugin)
                    .then((response) => {
                        this.plugin = response.data
                    })
                    .catch((error) => {
                        if(error.response) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Plugins not loaded',
                                duration: 5000,
                                text: 'Something went wrong<br>' + error.response.data.message
                            });
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Plugins not loaded',
                                duration: 5000,
                                text: 'Something went wrong loading plugins'
                            });
                        }

                    })
            },
            saveSettings() {
                axios.patch('instances/' + this.$route.params.id + '/plugins/' + this.$route.params.plugin + '/config', this.plugin.config)
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Config changed',
                            duration: 5000,
                            text: 'Your config changes are saved'
                        });
                        this.$router.push('/' + this.$route.params.id + '/plugins')
                    })
                    .catch((error) => {
                        if(error.response) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Config not changed',
                                duration: 5000,
                                text: 'Something went wrong<br>' + error.response.data.message
                            });
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Config not changed',
                                duration: 5000,
                                text: 'Something went wrong'
                            });
                        }

                    })
            }
        }
    }
</script>
