<template>
    <div>



        <CCard>
            <CCardHeader>
                <slot name="header" >
                    {{ plugin.name }} Settings
                </slot>

            </CCardHeader>
            <CCardBody>
                <div v-if="plugin.meta">
                    <div v-for="variable in plugin.meta.vars">
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

                <ul v-if="plugin.meta">
                    <li v-for="variable in plugin.meta.vars">{{ variable }}</li>
                </ul>
            </CCardBody>
        </CCard>

        {{ plugin.config }}
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
                console.log(this.plugin.config)
            }
        }
    }
</script>
