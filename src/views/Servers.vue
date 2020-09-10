<template>
    <div>
        <h1>Please select the server:</h1>

        <div v-for="(instance, key) in this.$store.state.instances">
            <div v-if="instance">
                <div v-if="instance.state == 2">
                    <router-link :to="key + '/dashboard'">#{{ instance.id }} | {{ instance.host }} | {{ instance.serverinfo.name }} | {{ instance.serverinfo.map }} ({{ instance.serverinfo.mode }}) | {{ instance.serverinfo.uptime }}</router-link>
                </div>
                <div v-else>
                    [DISCONNECTED] {{ instance.host }} <a @click="connect(key)">Try connect</a>
                </div>
            </div>
        </div>

        <br>
        <small>(This screen has no design yet, obviously)</small>

        <button v-on:click="test">Test</button>


    </div>
</template>

<script>

    import axios from "axios";

    export default {
        name: 'Servers',
        components: {


        },
        data () {
            return {}
        },
        methods: {
            test() {
                this.$store.getters.hasPermission['INSTANCE#ACCESS']
            },
            connect(instance_id) {
                axios.patch('instances/' + instance_id + '/start', {})
                    .then((response) => {
                        console.log(response)
                    })
                    .catch(() => {
                        alert("We couldnt connect because fuck you")
                    })
            }
        }
    }
</script>
