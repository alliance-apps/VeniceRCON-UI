<template>
    <div>
        <CRow>
            <CCol sm="6">
                <CCard>
                    <CCardHeader>
                        <slot name="header">
                            <CIcon name="cil-grid"/> <b>0/88</b>
                        </slot>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                                :hover="hover"
                                :striped="striped"
                                :bordered="bordered"
                                :small="small"
                                :fixed="fixed"
                                :items="getPlayersInTeam(1)"
                                :fields="fields"
                                :items-per-page="small ? 10 : 5"
                                pagination
                                sorter
                                table-filter
                        >
                            <template #status="{item}">
                                <td>
                                    <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
                                </td>
                            </template>


                            <template #ping="{item}">
                                <td>
                                    <CIcon name="cil-signal-cellular-4" class="text-success" v-if="item.ping < 33" />
                                    <CIcon name="cil-signal-cellular-3" class="text-warning" v-else-if="item.ping < 80" />
                                    <CIcon name="cil-signal-cellular-0" class="text-danger" v-else />
                                    {{ item.ping }}ms
                                </td>
                            </template>

                            <template #show_details="{item, index}">
                                <td class="py-2">
                                    <CButton
                                            color="primary"
                                            variant="outline"
                                            square
                                            size="sm"
                                            @click="toggleDetails(item, index)"
                                    >
                                        {{Boolean(playerDetailsToggled[item.playerGuid]) ? 'Hide' : 'Show'}}
                                    </CButton>
                                </td>
                            </template>

                            <template #details="{item}">
                                <CCollapse :show="Boolean(playerDetailsToggled[item.playerGuid])" :duration="collapseDuration">
                                    <CCardBody>
                                        <CMedia :aside-image-props="{ height: 102 }">
                                            <h4>
                                                Test
                                            </h4>
                                            <p class="text-muted">User since: Test</p>
                                            <CButton size="sm" color="info" class="">
                                                User Settings
                                            </CButton>
                                            <CButton size="sm" color="danger" class="ml-1">
                                                Delete
                                            </CButton>
                                        </CMedia>
                                    </CCardBody>
                                </CCollapse>
                            </template>
                        </CDataTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>





    </div>
</template>

<script>
    export default {
        data() {
            return {
                // Initialized to zero to begin
                playerDetailsToggled: [],
                collapseDuration: 0
            }
        },

        name: 'PlayerList',
        props: {
            items: Array,
            fields: {
                type: Array,
                default () {

                    return ['name', 'squad', 'kills', 'deaths', 'score', 'ping', {
                        key: 'show_details',
                        label: '',
                        _style: 'width:1%',
                        sorter: false,
                        filter: false
                    }]
                }
            },
            caption: {
                type: String,
                default: 'Table'
            },
            hover: Boolean,
            striped: Boolean,
            bordered: Boolean,
            small: Boolean,
            fixed: Boolean,
            dark: Boolean,
        },
        methods: {
            getBadge (status) {
                return status === 'Active' ? 'success'
                    : status === 'Inactive' ? 'secondary'
                        : status === 'Pending' ? 'warning'
                            : status === 'Banned' ? 'danger' : 'primary'
            },
            toggleDetails (item) {
                this.$set(this.playerDetailsToggled, item.playerGuid, !this.playerDetailsToggled[item.playerGuid])
                this.collapseDuration = 300
                this.$nextTick(() => { this.collapseDuration = 0})
            },
            getSquadName(squadId) {
                switch (squadId) {
                    case 0: return "None"
                    case 1: return "Alpha"
                    case 2: return "Bravo"
                    case 3: return "Charlie"
                    case 4: return "Delta"
                    case 5: return "Echo"
                    case 6: return "Foxtrot"
                    case 7: return "Golf"
                    case 8: return "Hotel"
                    case 9: return "India"
                    case 10: return "Juliett"
                    case 11: return "Kilo"
                    case 12: return "Lima"
                    case 13: return "Mike"
                    case 14: return "November"
                    case 15: return "Oscar"
                    case 16: return "Papa"
                    case 17: return "Quebec"
                    case 18: return "Romeo"
                    case 19: return "Sierra"
                    case 20: return "Tango"
                    case 21: return "Uniform"
                    case 22: return "Victor"
                    case 23: return "Whiskey"
                    case 24: return "X-Ray"
                    case 25: return "Yankee"
                    case 26: return "Zulu"
                }
            },
            getPlayersInTeam(teamId) {
                let players = Object.values(JSON.parse(JSON.stringify(this.$store.state.instances[this.$route.params.id].players))).filter(function(player) {
                    return player.teamId == teamId
                })
                for(let i = 0; i < players.length; i++) {
                    players[i].squad = this.getSquadName(players[i].squadId)
                }
                return players
            }
        }
    }
</script>
