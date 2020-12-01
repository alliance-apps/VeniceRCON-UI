<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header" >
                    User management - instance #{{ this.$route.params.idalt }}
                </slot>

            </CCardHeader>
            <CCardBody>
                {{ users }}
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    import axios from "axios";

    const fields = [
        { key: 'id', label: 'ID'},
        { key: 'username'},
        { key: 'plugins' },
        { key: 'delete' },
    ]

    export default {
        name: 'Usermanagement',
        components: {

        },
        data () {
            return {
                users: [],
                fields,

            }
        },
        mounted() {
            this.loadUsers()
        },
        methods: {
            loadUsers() {
                axios.get('instances/' + this.$route.params.idalt + '/users')
                    .then((response) => {
                        this.users = response.data
                    })
                    .catch(() => {
                        alert("We couldnt log you in because fuck you")
                    })
            }
        }
    }
</script>
