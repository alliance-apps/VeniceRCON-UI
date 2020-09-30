<template>
    <div>
        <CRow>
            <CCol sm="6">
                <PlayerList :team-id="1"/>
            </CCol>
            <CCol sm="6">
                <PlayerList :team-id="2"/>
            </CCol>
        </CRow>
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
