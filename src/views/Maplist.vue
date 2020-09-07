<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header">
                    <CIcon name="cil-grid"/> <b>Edit maplist</b>
                </slot>
            </CCardHeader>
            <CCardBody>
                <CDataTable

                        bordered
                        :items="this.$store.state.instances[this.$route.params.id].maps"
                        :fields="fields"
                        hover
                >

                    <template #map="{item}">
                        <td class="py-2">
                            {{ $bf3_getMapDisplayName(item.map) }}
                        </td>
                    </template>

                    <template #mode="{item}">
                        <td class="py-2">
                            {{ $bf3_getGamemodeDisplayName(item.mode) }}
                        </td>
                    </template>



                    <template #remove="{item}">
                        <td class="py-2">
                            <CButton
                                    color="primary"
                                    variant="outline"
                                    square
                                    size="sm"
                                    @click="removeMap(item)"
                            >
                                Remove
                            </CButton>
                        </td>
                    </template>

                </CDataTable>
            </CCardBody>
        </CCard>
        <CCard>
            <CCardHeader>
                <slot name="header">
                    <CIcon name="cil-grid"/> <b>Add map</b>
                    <CButton
                            class="float-right"
                            color="success"
                            label="Rounds"
                            :disabled="!$bf3_isMapGmCombinationPossible(addmap.map, addmap.gamemode)"
                            @click="addMap()"
                    >
                        Add to rotation
                    </CButton>
                </slot>
            </CCardHeader>
            <CCardBody>
                <CAlert color="warning" v-if="$bf3_isSPCoopMap(addmap.map)">
                    You have selected a singleplayer/coop map. This is only possible with special mods. Only select this if you know exactly what you are doing!
                </CAlert>
                <CAlert color="danger" v-if="!$bf3_isMapGmCombinationPossible(addmap.map, addmap.gamemode)">
                    The map-gamemode combination you selected is not possible.
                </CAlert>
                <CRow>


                    <CCol sm="4">
                        <CSelect
                                label="Map"
                                :value.sync="addmap.map"
                                :options="$bf3_getAllAvailableMapsForSelect()"
                        />
                    </CCol>
                    <CCol sm="4">
                        <CSelect
                                label="Gamemode"
                                :value.sync="addmap.gamemode"
                                :options="$bf3_getAllAvailableGamemodesForSelect()"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CSelect
                                label="Rounds"
                                :value.sync="addmap.rounds"
                                :options="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CSelect
                                label="Insert after"
                                :value.sync="addmap.insertpos"
                                :options="insertAfterOptions"
                        />
                    </CCol>
                </CRow>


            </CCardBody>
        </CCard>

        {{ addmap }}


        {{ $bf3_isSPCoopMap(addmap.map) }}

        {{ $bf3_isMapGmCombinationPossible(addmap.map, addmap.gamemode) }}
    </div>
</template>

<script>
    import axios from "axios";
    import store from "../store";

    export default {
        name: 'Players',
        props: {
            fields: {
                type: Array,
                default () {

                    return ['index', 'map', 'mode', 'rounds', 'remove']
                }
            },
        },
        components: {

        },
        data () {
            return {
                addmap: {
                    map: "MP_001",
                    gamemode: "RushLarge0",
                    rounds: 2,
                    insertpos: 0
                }
            }
        },
        computed: {
            insertAfterOptions() {
                //value, label
                let options = []
                options.push({value: 0, label: "#" + "0"  + " - " + "Beginning"})
                for(let i = 1; i <= this.$store.state.instances[this.$route.params.id].maps.length; i++) {
                    options.push({value: i, label: "#" + i  + " - " + this.$bf3_getMapDisplayName(this.$store.state.instances[this.$route.params.id].maps[i - 1].map)})
                }
                return options
            }
        },
        methods: {
            removeMap(map) {
                axios.delete('instances/' + this.$route.params.id + '/maps/' + (map.index - 1), {})
                    .then((response) => {
                        console.log(response)
                    })
                    .catch(() => {
                        alert("We couldnt log you in because fuck you")
                    })
            },
            addMap() {
                axios.post('instances/' + this.$route.params.id + '/maps', {map: this.addmap.map, mode: this.addmap.gamemode, rounds: this.addmap.rounds, index: this.addmap.insertpos})
                    .then((response) => {
                        console.log(response)
                    })
                    .catch(() => {
                        alert("We couldnt log you in because fuck you")
                    })
            }
        }
    }
</script>
