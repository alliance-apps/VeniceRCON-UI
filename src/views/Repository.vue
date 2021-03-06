<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header" >
                    Repositories
                </slot>

            </CCardHeader>
            <CCardBody>
                <form @submit.prevent="addRepository" v-show="$store.getters.hasPermission('PLUGINREPOSITORY#CREATE', $route.params.id)">
                    <CRow>
                        <CCol sm="7">
                            <CInput
                                    placeholder="Enter Repo URL"
                                    :value.sync="repo_url"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInput
                                    placeholder="Branch"
                                    :value.sync="repo_branch"
                            />
                        </CCol>
                        <CCol sm="2">
                            <CButton
                                    type="submit"
                                    block
                                    color="success"
                            >
                                Add
                            </CButton>
                        </CCol>
                    </CRow>
                </form>

                <CDataTable
                        :items="repositories"
                        :fields="fields"
                        hover

                >
                    <template #id="{item}">
                        <td>
                            {{ item.id }}
                        </td>
                    </template>

                    <template #url="{item}">
                        <td>
                            <div v-if="item.type === 'GITHUB'">
                                <a :href="'https://github.com/' + item.options.username + '/' + item.options.repository + '/tree/' + item.options.branch" target="_blank">{{ item.options.username }}/{{ item.options.repository }}</a><br>
                            </div>
                            <div v-if="item.type === 'DEV'">
                                DEV
                            </div>
                            <small v-for="plugin in item.plugins" :key="plugin.uuid">{{ plugin.name }} ({{ plugin.version }}), </small>
                        </td>
                    </template>

                    <template #plugins="{item}">
                        <td>
                            {{ item.plugins.length }}
                        </td>
                    </template>

                    <template #delete="{item}">
                        <td class="py-2">
                            <confirm-delete
                                    title="Are you sure you want to delete this repository?"
                                    button-color="danger"
                                    :confirm-function="deleteRepository"
                                    :arg="item.id"
                                    :has-permission="$store.getters.hasPermission('PLUGINREPOSITORY#REMOVE', null)"
                            ></confirm-delete>
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
        { key: 'id', label: 'ID'},
        { key: 'url', label: 'URL'},
        { key: 'plugins' },
        { key: 'delete' },
    ]

    export default {
        name: 'Repositories',
        components: {
            ConfirmDelete

        },
        data () {
            return {
                fields,
                repositories: [],
                repo_url: '',
                repo_branch: 'main'
            }
        },
        mounted() {
            this.loadRepositories()
        },
        methods: {

            loadRepositories() {
                axios.get('repository')
                    .then((response) => {
                        this.repositories = response.data
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: 'Unable to load repositories'
                        })
                    })
            },
            deleteRepository(id) {
                if(!this.$store.getters.hasPermission('PLUGINREPOSITORY#REMOVE', null)) return
                axios.delete('repository/' + id)
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Repository deleted',
                            duration: 5000,
                            text: 'Repository was deleted'
                        })
                        this.loadRepositories()
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: 'Unable to delete repository'
                        })
                    })
            },
            addRepository() {
                if(!this.$store.getters.hasPermission('PLUGINREPOSITORY#CREATE', null)) return
                axios.post('repository', {type: 'GITHUB', username: 'alliance-apps', repository: 'VeniceRCON-plugin-repo', 'branch': this.repo_branch})
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Repository added',
                            duration: 5000,
                            text: 'Repository was added'
                        })
                        this.loadRepositories()
                        this.repo_url = ''
                        this.repo_branch = 'main'
                    })
                    .catch((error) => {
                        if(error.response) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Error',
                                duration: 10000,
                                text: 'Unable to add repository<br>' + error.response.data.message
                            })
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Error',
                                duration: 5000,
                                text: 'Unable to add repository'
                            })
                        }
                    })
            }
        }
    }
</script>
