<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header" >
                    <CIcon name="cil-list"/> <b>Logs</b>
                </slot>
                <CButton
                        class="float-right"
                        color="primary"
                        square
                        size="sm"
                        v-show="!refresh"
                        @click="loadLogs(); refresh = true;"
                >
                    Refresh
                </CButton>
            </CCardHeader>
            <CCardBody>
                <CTabs variant="pills" :active-tab="0">
                    <CTab title="Instance">
                        <span v-for="(log, key) in instanceLogs" :key="key">{{ log.created }} - {{ log.message }}<br></span>
                    </CTab>
                    <CTab title="Plugins">
                        <span v-for="(log, key) in pluginLogs" :key="key">{{ log.created }} - [{{ log.sourceLocation }}] {{ log.message }}<br></span>
                    </CTab>
                </CTabs>
            </CCardBody>
        </CCard>

    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Logs',
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
            this.loadLogs()
        },
        methods: {
            loadLogs() {
                axios.get('instances/' + this.$route.params.id + '/logs/instance')
                    .then((response) => {
                        this.instanceLogs = response.data
                    })
                    .catch(() => {
                        this.refresh = false
                        // TODO: Notification
                    })
                axios.get('instances/' + this.$route.params.id + '/logs/plugins')
                    .then((response) => {
                        this.pluginLogs = response.data
                        this.refresh = false
                    })
                    .catch(() => {
                        this.refresh = false
                        // TODO: Notification
                    })
            },
        }
    }
</script>