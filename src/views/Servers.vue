<template>
    <div>
        <h1>Please select the server:</h1>
        <CButton v-for="(instance, key) in $store.state.instances" color="primary" class="m-2" @click="$store.commit('updatePersistent', ['activeServer' , key]); $router.push('/dashboard')">
            #{{ key }} {{ instance.host }} - {{ instance.serverinfo.name }}
        </CButton>
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
