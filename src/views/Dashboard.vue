<template>
    <div>

        <CRow>
            <CCol sm="6" lg="12" style="height: 170px; max-height: 200px">
                <!-- this.$bf3_getMapDisplayName(this.$store.state.instances[$route.params.id].serverinfo.map) -->
                <MapRoundWidget
                        class="h-100"
                        color="primary"
                        :text="this.$bf3_getGamemodeDisplayName(this.$store.state.instances[$route.params.id].serverinfo.mode)"
                        :header="this.$bf3_getMapDisplayName(this.$store.state.instances[$route.params.id].serverinfo.map)"
                        :style="'background-image: linear-gradient( rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url(\'' + this.$bf3_getMapImage(this.$store.state.instances[$route.params.id].serverinfo.map) +  '\'); background-repeat: no-repeat; background-size: cover;'"
                >
                    <template #default>
                        <CDropdown
                                color="transparent p-0"
                                placement="bottom-end"
                        >
                            <template #toggler-content>
                                <CIcon name="cil-location-pin"/>
                            </template>
                            <CDropdownItem @click="roundAction('restartRound', 0)">Restart round</CDropdownItem>
                            <CDropdownItem @click="roundAction('nextRound', 0)">Run next round</CDropdownItem>
                            <CDropdownItem @click="roundAction('endRound', 1)">End round (US wins)</CDropdownItem>
                            <CDropdownItem @click="roundAction('endRound', 2)">End round (RU wins)</CDropdownItem>
                        </CDropdown>
                    </template>
                    <template #footer>
                        <div class="card-body row text-center">

                            <div class="col">
                                <div  class="text-value-lg">
                                    {{ $store.state.instances[$route.params.id].serverinfo.slots + '/' + $store.state.instances[$route.params.id].serverinfo.totalSlots }}
                                </div>
                                <div  class="text-uppercase text-muted small">
                                    Players
                                </div>
                            </div>


                            <div class="col">
                                <div  class="text-value-lg">
                                    {{ $store.state.instances[$route.params.id].serverinfo.scores[0] || "&#8734;" }}
                                </div>
                                <div  class="text-uppercase text-muted small">
                                    US
                                </div>
                            </div>


                            <div class="col">
                                <div class="text-value-lg" v-if="$store.state.instances[$route.params.id].serverinfo.mode == 'RushLarge0'">
                                    &#8734;
                                </div>
                                <div class="text-value-lg" v-else>
                                    {{ $store.state.instances[$route.params.id].serverinfo.scores[1] || "&#8734;" }}
                                </div>
                                <div  class="text-uppercase text-muted small">
                                    RU
                                </div>
                            </div>

                            <div class="col">
                                <div  class="text-value-lg">
                                    {{ ($store.state.instances[$route.params.id].serverinfo.roundsPlayed + 1) + '/' + $store.state.instances[$route.params.id].serverinfo.roundsTotal }}
                                </div>
                                <div  class="text-uppercase text-muted small">
                                    Round
                                </div>
                            </div>


                        </div>


                    </template>
                </MapRoundWidget>
            </CCol>



        </CRow>

        <br>
        <CRow>
            <CCol sm="6" lg="6">


            </CCol>
            <CCol sm="6" lg="6">


            </CCol>
        </CRow>







        User: {{ this.$store.state.user }}
        <br><br>Instance Permissions: {{ this.$store.state.permissions }}
        <br><br>Global Permissions: {{ this.$store.state.globalPermissions }}
        <br><br>Serverdata: {{ this.$store.state.instances[this.$route.params.id] }}


    </div>
</template>

<script>
    import WidgetsDropdown from './widgets/WidgetsDropdown'
    import PlayerList from "./widgets/PlayerList";
    import MapRoundWidget from "./base/MapRoundWidget";

    import axios from "axios";

    export default {
        name: 'Dashboard',
        components: {
            PlayerList,
            MapRoundWidget
        },
        computed: {

        },
        watch: {
            instances() {
                console.log("INstances changed")
            }
        },
        data () {
            return {}
        },
        methods: {
            roundAction(action, winningTeam) {
                axios.post('instances/' + this.$route.params.id + '/maps/' + action, {winner: winningTeam})
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Success',
                            duration: 5000,
                            text: 'The action was exectued successfully'
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
            }
        }
    }
</script>
