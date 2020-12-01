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
                    <li v-for="instance in $store.state.instances"><router-link :to="'/usermanagement/' + instance.id">#{{ instance.id }} - {{ instance.host }}:{{ instance.port }} <span v-show="instance.serverinfo.name"> - {{ instance.serverinfo.name }}</span></router-link></li>
                </ul>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    import axios from "axios";


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
