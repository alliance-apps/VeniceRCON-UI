<template>
    <div>
        <CAlert color="warning" v-if="!$store.getters.hasPermission('MAP#MANAGE', $route.params.id)">
            You have no permission to edit this list
        </CAlert>
        <CCard>
            <CCardHeader>
                <slot name="header">
                    <CIcon name="cil-list-numbered"/> <b>Maplist</b>
                </slot>
            </CCardHeader>
            <CCardBody>
                <CDataTable

                        bordered
                        :items="this.$store.state.instances[this.$route.params.id].maps"
                        :fields="fields"
                        hover
                >
                    <template #index="{item}">
                        <td class="py-2">
                            {{ item.index }}
                            <CBadge color="primary" v-if="$store.state.instances[$route.params.id].mapInfo.index == item.index">Current</CBadge>
                            <CBadge color="success" v-if="$store.state.instances[$route.params.id].mapInfo.next == item.index">Next</CBadge>
                        </td>
                    </template>

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

                    <template #move="{item}">
                        <td class="py-2">
                            <div v-if="$store.getters.hasPermission('MAP#MANAGE', $route.params.id)">
                                <CButton
                                        color="danger"
                                        variant="outline"
                                        square
                                        size="sm"
                                        v-if="$store.getters.hasPermission('MAP#MANAGE', $route.params.id)"
                                        @click="removeMap(item)"
                                >
                                    <CIcon name="cil-trash"/>
                                </CButton>
                                &nbsp;
                                <CButton
                                        color="primary"
                                        variant="outline"
                                        square
                                        size="sm"
                                        @click="(item.index < $store.state.instances[$route.params.id].maps.length - 1) && moveMap(item.index, item.index + 1)"
                                        :disabled="item.index >= $store.state.instances[$route.params.id].maps.length - 1"
                                >
                                    <CIcon name="cil-arrow-bottom"/>
                                </CButton>
                                &nbsp;
                                <CButton
                                        color="primary"
                                        variant="outline"
                                        square
                                        size="sm"
                                        @click="item.index != 0 && moveMap(item.index, item.index - 1)"
                                        :disabled="item.index == 0"
                                >
                                    <CIcon name="cil-arrow-top"/>
                                </CButton>
                                &nbsp;
                                <CButton
                                        v-if="$store.getters.hasPermission('MAP#MANAGE', $route.params.id)"
                                        color="primary"
                                        variant="outline"
                                        square
                                        size="sm"
                                        @click="setNext(item, false)"
                                >
                                    Play next
                                </CButton>
                                &nbsp;
                                <CButton
                                        v-if="$store.getters.hasPermission('MAP#MANAGE', $route.params.id)"
                                        color="primary"
                                        variant="outline"
                                        square
                                        size="sm"
                                        @click="setNext(item, true)"
                                >
                                    Play now
                                </CButton>
                            </div>
                        </td>
                    </template>


                </CDataTable>
            </CCardBody>
        </CCard>

        <CCard v-if="this.$store.getters.hasPermission('MAP#MANAGE', $route.params.id)">
            <CCardHeader>
                <slot name="header">
                    <CIcon name="cil-library-add"/> <b>Add map</b>

                    <CButton
                            class="float-right"
                            color="success"
                            label="Rounds"
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
                <CRow>
                    <CCol sm="4">
                        <CSelect
                                label="Map"
                                :value.sync="addmap.map"
                                @change="mapChanged()"
                                :options="$bf3_getAllAvailableMapsForSelect()"
                        />
                    </CCol>
                    <CCol sm="4">
                        <CSelect
                                label="Gamemode"
                                :value.sync="addmap.gamemode"
                                :options="$bf3_getAllAvailableGamemodesForSelect(addmap.map)"
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
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Players',
        props: {
            fields: {
                type: Array,
                default () {

                    return ['index', 'map', 'mode', 'rounds', 'move']
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
            mapChanged() {
                if(!this.$bf3_getAllAvailableGamemodesForSelect(this.addmap.map).includes(this.addmap.gamemode)) {
                    this.addmap.gamemode = this.$bf3_getAllAvailableGamemodesForSelect(this.addmap.map)[0].value
                }
            },
            removeMap(map) {
                axios.delete('instances/' + this.$route.params.id + '/maps/' + (map.index))
                    .then((response) => {
                        console.log(response)
                    })
                    .catch(() => {
                        alert("We couldnt log you in because fuck you")
                    })
            },
            addMap() {
                axios.post('instances/' + this.$route.params.id + '/maps', {map: this.addmap.map, mode: this.addmap.gamemode, rounds: this.addmap.rounds, index: this.addmap.insertpos})
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Success',
                            duration: 5000,
                            text: 'Map has been added to list'
                        })
                    })
                    .catch((error) => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: error.response.data.message
                        })
                    })
            },
            setNext(map, now) {
                axios.post('instances/' + this.$route.params.id + '/maps/' + (map.index) + '/next')
                    .then((response) => {
                        console.log(response)
                        if (now) {
                            axios.post('instances/' + this.$route.params.id + '/maps/nextRound')
                                .then(() => {
                                    this.$notify({
                                        group: 'foo',
                                        type: 'success',
                                        title: 'Success',
                                        duration: 5000,
                                        text: 'Next map/gamemode is being run now'
                                    })
                                })
                                .catch((error) => {
                                    this.$notify({
                                        group: 'foo',
                                        type: 'error',
                                        title: 'Error',
                                        duration: 5000,
                                        text: error.response.data.message
                                    })
                                })
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'success',
                                title: 'Success',
                                duration: 5000,
                                text: 'Next map/gamemode have been changed'
                            })
                        }
                    })
                    .catch((error) => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: error.response.data.message
                        })
                    })
            },
            moveMap(fromIndex, toIndex) {
                axios.patch('instances/' + this.$route.params.id + '/maps/' + fromIndex + '/position/' + toIndex)
                    .then(() => {

                    })
                    .catch((error) => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: error.response.data.message
                        })
                    })
            }
        },
        mounted() {

        }
    }
</script>
