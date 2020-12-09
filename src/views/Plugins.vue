<template>
    <div>
            {{ plugins }}
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Plugins',
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
            loadPlugins() {
                axios.get('instances/' + this.$route.params.id + '/plugins')
                    .then((response) => {
                        this.plugins = response.data
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
            startPlugin(id) {
                axios.post('instances/' + this.$route.params.id + '/plugins/' + id + '/start')
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Plugin started',
                            duration: 5000,
                            text: 'Plugin #' + id + ' has been started successfully'
                        });
                        this.loadPlugins()
                    })
                    .catch((error) => {
                        if(error.response) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Plugins not started',
                                duration: 5000,
                                text: 'Something went wrong<br>' + error.response.data.message
                            });
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Plugins not started',
                                duration: 5000,
                                text: 'Something went wrong'
                            });
                        }

                    })
            },
            stopPlugin(id) {
                axios.post('instances/' + this.$route.params.id + '/plugins/' + id + '/stop')
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Plugin stopped',
                            duration: 5000,
                            text: 'Plugin #' + id + ' has been stopped successfully'
                        });
                        this.loadPlugins()
                    })
                    .catch((error) => {
                        if(error.response) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Plugins not stopped',
                                duration: 5000,
                                text: 'Something went wrong<br>' + error.response.data.message
                            });
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Plugins not stopped',
                                duration: 5000,
                                text: 'Something went wrong'
                            });
                        }

                    })
            },
            deletePlugin(id) {
                axios.delete('instances/' + this.$route.params.id + '/plugins/' + id)
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Plugin deleted',
                            duration: 5000,
                            text: 'Plugin #' + id + ' has been deleted'
                        });
                        this.loadPlugins()
                    })
                    .catch((error) => {
                        if(error.response) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Plugins not deleted',
                                duration: 5000,
                                text: 'Something went wrong<br>' + error.response.data.message
                            });
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Plugins not deleted',
                                duration: 5000,
                                text: 'Something went wrong'
                            });
                        }

                    })
            },
        }
    }
</script>
