<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header" >
                    User management - Select instance
                </slot>

            </CCardHeader>
            <CCardBody>
                <ul>
                    <li v-for="instance in $store.state.instances" :key="instance.id">
                        <router-link
                                :to="'/usermanagement/' + instance.id"
                                v-show="$store.getters.hasPermission('INSTANCEUSER#ACCESS', instance.id)"
                        >
                            #{{ instance.id }} - {{ instance.host }}:{{ instance.port }}
                            <span v-show="instance.serverinfo.name">
                                - {{ instance.serverinfo.name }}
                            </span>
                        </router-link>
                        <span v-show="!$store.getters.hasPermission('INSTANCEUSER#ACCESS', instance.id)">
                            #{{ instance.id }} - {{ instance.host }}:{{ instance.port }}
                            <span v-show="instance.serverinfo.name">
                                - {{ instance.serverinfo.name }}
                            </span>
                            [No permissions]
                        </span>
                    </li>
                </ul>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>

    export default {
        name: 'UsermanagementList',
        components: {


        },
        data () {
            return {
                repositories: [],
                repo_url: '',
                repo_branch: 'main'
            }
        },
        mounted() {
        },
        methods: {

        }
    }
</script>
