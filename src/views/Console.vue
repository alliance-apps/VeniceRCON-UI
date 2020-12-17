<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header" >
                    <CIcon name="cil-list"/> <b>Console</b>
                </slot>
            </CCardHeader>
            <CCardBody>
                This is not yet working. Check back soon :)


            </CCardBody>
        </CCard>

    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Console',
        components: {
        },
        data () {
            return {
                refresh: false,
                instanceLogs: [],
                pluginLogs: [],
            }
        },
        mounted() {
            /** this payload enables raw console commands to be received */
            const payload = {
                id: this.$route.params.id,
                name: "raw",
                set: true
            }
            this.$store.state.socketCon.emit("SELF#CMD_FEATURE", payload)
        },
        destroyed() {
            /** this payload disabled raw console commands to be received */
            this.$store.state.socketCon.emit("SELF#CMD_FEATURE", {
                id: this.$route.params.id,
                name: "raw",
                set: false
            })
        },
        methods: {
            sendCommand() {




            },
        }
    }
</script>