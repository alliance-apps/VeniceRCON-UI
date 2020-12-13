<template>
    <div>
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
                    <li>Description: {{ plugin.meta.description }}</li>
                </ul>

                <ul>
                    <li v-for="variable in plugin.meta.vars">{{ variable }}</li>
                </ul>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    import axios from "axios";


    export default {
        name: 'PluginConfig',
        components: {

        },
        data () {
            return {
                plugin: {}
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
        }
    }
</script>
