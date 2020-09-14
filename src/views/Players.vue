<template>
    <div>
        <PlayerList/>


        <br><br>
        {{ Object.values(JSON.parse(JSON.stringify(this.$store.state.instances[$route.params.id].players))) }}

    </div>
</template>

<script>
    import PlayerList from "./widgets/PlayerList";

    export default {
        name: 'Players',
        components: {
            PlayerList

        },
        data () {
            return {}
        },
        methods: {

        }
    }
</script>
