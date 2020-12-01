<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header" >
                    Your account
                </slot>

            </CCardHeader>
            <CCardBody>
                <ul>
                    <li>User ID: {{ this.$store.state.user.id }}</li>
                    <li>Username: {{ this.$store.state.user.username }}</li>
                    <li v-show="this.$store.state.globalPermissions.length > 0">
                        Global Permissions:
                        <span v-for="permission in this.$store.state.globalPermissions">
                            {{ permission }},
                        </span>
                    </li>
                    <li v-show="this.$store.state.globalPermissions.length === 0">
                        Global Permissions: You don't have global permissions
                    </li>
                    <li>
                        Instance Permissions
                        <ul>
                            <li v-for="(instance, key) in this.$store.state.permissions">
                                Server #{{ key }}
                                <ul>
                                    <li v-for="permission in instance">{{ permission }}</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    import axios from "axios";


    export default {
        name: 'Profile',
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
