<template>
    <div>
        <h1>Please select the server:</h1>

        <div v-for="(instance, key) in this.$store.state.instances">
            <div v-if="instance">
                <div v-if="instance.state == 2">
                    <router-link :to="key + '/dashboard'">#{{ instance.id }} | {{ instance.host }} | {{ instance.serverinfo.name }} | {{ instance.serverinfo.map }} ({{ instance.serverinfo.mode }}) | {{ instance.serverinfo.uptime }}</router-link>
                </div>
                <div v-else>
                    <router-link :to="key + '/dashboard'">[DISCONNECTED] {{ instance.host }}</router-link>
                </div>
            </div>
        </div>

        <br>
        <small>(This screen has no design yet, obviously)</small>
    </div>
</template>

<script>
    import WidgetsDropdown from './widgets/WidgetsDropdown'

    export default {
        name: 'Servers',
        components: {


        },
        data () {
            return {}
        },
        methods: {

        }
    }
</script>
