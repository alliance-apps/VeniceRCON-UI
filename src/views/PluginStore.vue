<template>
    <div>
        {{ plugins }}
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
            this.loadPlugins()
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
