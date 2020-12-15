<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header" >
                    <CIcon name="cil-input-power"/> <b>Plugins</b>
                </slot>
                <CButton
                        class="float-right"
                        color="success"
                        square
                        size="sm"
                        @click="$router.push('/' + $route.params.id + '/plugins/store')"
                >
                    Install plugins
                </CButton>
            </CCardHeader>
            <CCardBody>

                <CDataTable
                        :items="plugins"
                        :fields="fields"
                        hover

                >
                    <template #name="{item}">
                        <td>
                            {{ item.name }}
                            <CBadge color="danger" v-show="item.state === 0">
                                Stopped
                            </CBadge>
                            <CBadge color="success" v-show="item.state === 1">
                                Running
                            </CBadge>
                        </td>
                    </template>

                    <template #actions="{item}">
                        <td>
                            <CButton
                                    color="success"
                                    square
                                    size="sm"
                                    v-show="item.state === 0"
                                    @click="startPlugin(item.id)"
                            >
                                <CIcon name="cil-media-play"/>
                            </CButton>
                            &nbsp;
                            <CButton
                                    color="danger"
                                    square
                                    size="sm"
                                    v-show="item.state === 1"
                                    @click="stopPlugin(item.id)"
                            >
                                <CIcon name="cil-media-stop"/>
                            </CButton>
                            &nbsp;
                            <CButton
                                    color="primary"
                                    @click="$router.push('/' + $route.params.id + '/plugins/' + item.id)"
                            >
                                Config
                            </CButton>
                            &nbsp;
                            <CButton
                                    color="primary"
                                    disabled
                            >
                                Logs
                            </CButton>

                        </td>
                    </template>

                    <template #url="{item}">
                        <td>
                            {{ item.url }} [<a :href="item.repositoryUrl">{{ item.branch }}</a>]<br>
                            <small v-for="plugin in item.plugins" :key="plugin.id">{{ plugin.name }} ({{ plugin.version }}), </small>
                        </td>
                    </template>

                    <template #version="{item}">
                        <td>
                            <span :title="item.uuid">{{ item.meta.version }}</span>
                        </td>
                    </template>

                    <template #delete="{item}">
                        <td>
                            <confirm-delete
                                    title="Are you sure you want to delete this plugin from this instance? This will delete all configuration!"
                                    button-color="danger"
                                    :confirm-function="deletePlugin"
                                    :arg="item.id"
                                    :has-permission="$store.getters.hasPermission('PLUGIN#REMOVE', null)"
                            ></confirm-delete>
                        </td>
                    </template>

                    <template #config="{item}">
                        <td>
                            <CButton
                                    color="primary"
                                    @click="$router.push('/' + $route.params.id + '/plugins/' + item.id)"
                            >
                                Config
                            </CButton>
                        </td>
                    </template>

                </CDataTable>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    import axios from "axios";
    import ConfirmDelete from "./modals/ConfirmDelete";

    const fields = [
        { key: 'name'},
        { key: 'version' },
        { key: 'actions' },

        { key: 'delete' },
    ]

    export default {
        name: 'Plugins',
        components: {
            ConfirmDelete

        },
        data () {
            return {
                    fields,
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
                        setTimeout(() => { this.loadPlugins() }, 3000);
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
