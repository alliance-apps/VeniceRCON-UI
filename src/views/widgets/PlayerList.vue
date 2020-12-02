<template>
    <div>

                <CCard>
                    <CCardHeader>
                        <slot name="header" >
                            <div v-show="teamId === 1">
                                <CIcon name="cif-us"/> <b>US Army</b>
                            </div>
                            <div v-show="teamId === 2">
                                <CIcon name="cif-ru"/> <b>RU Army</b>
                            </div>
                        </slot>

                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                                fixed
                                :items="getPlayersInTeam(teamId)"
                                :fields="fields"
                        >


                            <template #kdr="{item}">
                                <td>
                                    <div>{{ item.kills }}:{{ item.deaths }}</div>
                                </td>
                            </template>


                            <template #ping="{item}">
                                <td>
                                    <CIcon name="cil-wifi-signal-4" class="text-success" v-show="item.ping < 40" />
                                    <CIcon name="cil-wifi-signal-2" class="text-warning" v-show="item.ping >= 40 && item.ping < 150" />
                                    <CIcon name="cil-warning" class="text-danger" v-show="item.ping >= 150" />
                                    {{ item.ping }}
                                </td>
                            </template>

                            <template #show_details="{item, index}">
                                <td class="py-2">
                                    <CDropdown
                                            color="secondary"
                                            toggler-text=""
                                            class="sm"
                                    >
                                        <CDropdownItem :disabled="!$store.getters.hasPermission('PLAYER#MOVE', $route.params.id)" @click="movePlayer(item.guid, teamId == 1 ? 2 : 1)">Move to other team</CDropdownItem>
                                        <CDropdownItem :disabled="!$store.getters.hasPermission('PLAYER#MOVE', $route.params.id)" @click="movePlayer(item.guid, teamId)">Kick from squad</CDropdownItem>
                                        <CDropdownDivider ></CDropdownDivider>
                                        <CDropdownItem :disabled="!$store.getters.hasPermission('PLAYER#KILL', $route.params.id)" @click="item.killPlayerModal.modal = true;">Kill</CDropdownItem>
                                        <CDropdownItem :disabled="!$store.getters.hasPermission('PLAYER#KICK', $route.params.id)" @click="item.kickPlayerModal.modal = true;">Kick</CDropdownItem>
                                        <CDropdownItem :disabled="!$store.getters.hasPermission('BAN#CREATE', $route.params.id)" @click="item.banPlayerModal.modal = true;">Ban</CDropdownItem>
                                        <CDropdownItem :disabled="!$store.getters.hasPermission('PLAYER#MESSAGE', $route.params.id)" @click="item.messagePlayerModal.modal = true;">Message</CDropdownItem>
                                    </CDropdown>
                                </td>

                                <CModal
                                        :title="'Kill player ' + item.name"
                                        color=""
                                        :show.sync="item.killPlayerModal.modal"
                                >
                                    <CInput
                                            label="Reason"
                                            placeholder="Enter reason for kill"
                                            :value.sync="item.killPlayerModal.reason"
                                    />
                                    <template #footer="{}">
                                        <CButton
                                                color="warning"
                                                :disabled="item.killPlayerModal.reason.length < 1"
                                                @click="killPlayer(item.guid); item.killPlayerModal.modal = false"
                                        >
                                            Kill {{ item.name }}
                                        </CButton>
                                    </template>
                                </CModal>

                                <CModal
                                        :title="'Kick player ' + item.name"
                                        color="warning"
                                        :show.sync="item.kickPlayerModal.modal"
                                >
                                    <CInput
                                            label="Reason"
                                            placeholder="Enter reason for kick"
                                            :value.sync="item.kickPlayerModal.reason"
                                    />
                                    <template #footer="{}">
                                        <CButton
                                                color="warning"
                                                :disabled="item.kickPlayerModal.reason.length < 1"
                                                @click="kickPlayer(item.guid); item.kickPlayerModal.modal = false"
                                        >
                                            Kick {{ item.name }}
                                        </CButton>
                                    </template>
                                </CModal>

                                <CModal
                                        :title="'Ban player ' + item.name"
                                        color="danger"
                                        :show.sync="item.banPlayerModal.modal"
                                >
                                    <CInput
                                            label="Reason"
                                            placeholder="Enter reason for ban"
                                            :value.sync="item.banPlayerModal.reason"
                                    />


                                    <CSelect
                                            label="Ban type"
                                            :value.sync="item.banPlayerModal.type"
                                            :options="[{value: 'name', label: 'Name: ' + item.name}, {value: 'guid', label: 'GUID: ' + item.guid}, {value: 'ip', label: 'IPv4 address: ' + item.ip}]"
                                    />

                                    <CSelect
                                            label="Length"
                                            :value.sync="item.banPlayerModal.length"
                                            :options="[{value: 'perm', label: 'Permanent'}, {value: 'seconds', label: 'Temporary'}]"
                                    />
                                    <CInput
                                            label="Length"
                                            type="number"
                                            :disabled="item.banPlayerModal.length == 'perm'"
                                            :value.sync="item.banPlayerModal.lengthval"
                                    />
                                    <CSelect
                                            label="Unit"
                                            :value.sync="item.banPlayerModal.unit"
                                            :disabled="item.banPlayerModal.length == 'perm'"
                                            :options="[{value: 1, label: 'Minutes'}, {value: 2, label: 'Hours'}, {value: 3, label: 'Days'}, {value: 4, label: 'Weeks'}]"
                                    />



                                    <template #footer="{}">
                                        <CButton
                                                color="danger"
                                                :disabled="item.banPlayerModal.reason.length < 1"
                                                @click="addBan(item.name, item.guid, item.ip); item.banPlayerModal.modal = false"
                                        >
                                            Ban {{ item.name }}
                                        </CButton>
                                    </template>
                                </CModal>

                                <CModal
                                        :title="'Message player ' + item.name"
                                        :show.sync="item.messagePlayerModal.modal"
                                >
                                    <CInput
                                            label="Message"
                                            placeholder="Enter message..."
                                            :value.sync="item.messagePlayerModal.message"
                                    />
                                    <template #footer="{}">
                                        <CButton
                                                color="primary"
                                                :disabled="item.messagePlayerModal.message.length < 1"
                                                @click="messagePlayer(item.guid, false); item.messagePlayerModal.modal = false"
                                        >
                                            Message {{ item.name }}
                                        </CButton>
                                        <CButton
                                                color="primary"
                                                :disabled="item.messagePlayerModal.message.length < 1"
                                                @click="messagePlayer(item.guid, true); item.messagePlayerModal.modal = false"
                                        >
                                            Yell at {{ item.name }}
                                        </CButton>
                                    </template>
                                </CModal>


                            </template>


                        </CDataTable>
                    </CCardBody>
                </CCard>
    </div>
</template>

<style>
    .table-responsive{
        overflow-y:visible;
        overflow-x:visible;
    }
</style>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                // Initialized to zero to begin
                playerDetailsToggled: [],
                collapseDuration: 0,
                killPlayerModal: {
                    modal: false,
                    reason: "",
                },
                kickPlayerModal: {
                    modal: false,
                    reason: "",
                },
                banPlayerModal: {
                    modal: false,
                    type: "guid",
                    reason: "",
                    length: "perm",
                    lengthval: 0,
                    unit: 1,
                },
                messagePlayerModal: {
                    modal: false,
                    message: "",
                },
            }
        },

        name: 'PlayerList',
        props: {
            items: Array,
            fields: {
                type: Array,
                default () {

                    return ['name', 'squad', 'kdr', 'score', 'ping', {
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

            teamId: Number
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
            getSquadNames() {
                let squads = []
                for(let i = 0; i <= 12; i++) {
                    squads.push(this.getSquadName(i))
                }
                return squads
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
                //let players = JSON.parse('[ { "name": "cat24max2", "guid": "bae992d18b4f4a17b631214dc85fddeb", "teamId": 1, "squadId": 1, "kills": 28, "deaths": 17, "score": 50, "rank": "true", "ping": 38, "spectator": false, "playerGuid": "db808847ad4c45cb98e2ead1ce854fa5", "ip": "79.206.216.154" },  { "name": "cat24max3", "guid": "bae992d18b4f4a17b631214dc85fddeb", "teamId": 1, "squadId": 0, "kills": 0, "deaths": 0, "score": 0, "rank": "true", "ping": 19, "spectator": false, "playerGuid": "db808847ad4c45cb98e2ead1ce854fa5", "ip": "79.206.216.154" } ,{ "name": "cat24max3", "guid": "bae992d18b4f4a17b631214dc85fddeb", "teamId": 1, "squadId": 0, "kills": 0, "deaths": 0, "score": 0, "rank": "true", "ping": 19, "spectator": false, "playerGuid": "db808847ad4c45cb98e2ead1ce854fa5", "ip": "79.206.216.154" },{ "name": "cat24max3", "guid": "bae992d18b4f4a17b631214dc85fddeb", "teamId": 1, "squadId": 0, "kills": 0, "deaths": 0, "score": 0, "rank": "true", "ping": 19, "spectator": false, "playerGuid": "db808847ad4c45cb98e2ead1ce854fa5", "ip": "79.206.216.154" },{ "name": "cat24max3", "guid": "bae992d18b4f4a17b631214dc85fddeb", "teamId": 1, "squadId": 0, "kills": 0, "deaths": 0, "score": 0, "rank": "true", "ping": 190, "spectator": false, "playerGuid": "db808847ad4c45cb98e2ead1ce854fa5", "ip": "79.206.216.154" },{ "name": "cat24max3", "guid": "bae992d18b4f4a17b631214dc85fddeb", "teamId": 1, "squadId": 0, "kills": 0, "deaths": 0, "score": 0, "rank": "true", "ping": 19, "spectator": false, "playerGuid": "db808847ad4c45cb98e2ead1ce854fa5", "ip": "79.206.216.154" },{ "name": "cat24max3", "guid": "bae992d18b4f4a17b631214dc85fddeb", "teamId": 1, "squadId": 0, "kills": 0, "deaths": 0, "score": 0, "rank": "true", "ping": 45, "spectator": false, "playerGuid": "db808847ad4c45cb98e2ead1ce854fa5", "ip": "79.206.216.154" }] ')
                let players = Object.values(JSON.parse(JSON.stringify(this.$store.state.instances[this.$route.params.id].players))).filter(function(player) {
                    return player.teamId == teamId
                })
                for(let i = 0; i < players.length; i++) {
                    players[i].squad = this.getSquadName(players[i].squadId)
                    players[i].killPlayerModal = {
                        modal: false,
                        reason: "",
                    }
                    players[i].kickPlayerModal = {
                        modal: false,
                        reason: "",
                    }
                    players[i].banPlayerModal = {
                        modal: false,
                        type: "guid",
                        reason: "",
                        length: "perm",
                        lengthval: 0,
                        unit: 1,
                    }
                    players[i].messagePlayerModal = {
                        modal: false,
                        message: "",
                    }
                }
                return players
            },
            movePlayer(playerGuid, teamId) {
                axios.post('instances/' + this.$route.params.id + '/players/' + playerGuid + '/move', {teamId: teamId, squadId: 0, kill: true})
                    .then(() => {

                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Error',
                            duration: 5000,
                            text: 'Unable to move player'
                        })
                    })
            },
            killPlayer(playerGuid) {
                axios.post('instances/' + this.$route.params.id + '/players/' + playerGuid + '/kill', {reason: this.killPlayerModal.reason})
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Player killed',
                            duration: 5000,
                            text: 'The player has been killed'
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
                this.killPlayerModal.reason = ""
            },
            kickPlayer(playerGuid) {
                axios.post('instances/' + this.$route.params.id + '/players/' + playerGuid + '/kick', {reason: this.kickPlayerModal.reason})
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Player kicked',
                            duration: 5000,
                            text: 'The player has been kicked'
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
                this.kickPlayerModal.reason = ""
            },
            addBan(name, guid, ip) {
                let playerid
                let duration = this.banPlayerModal.lengthval
                if(this.banPlayerModal.type == "name") playerid = name
                if(this.banPlayerModal.type == "guid") playerid = guid
                if(this.banPlayerModal.type == "ip") playerid = ip
                if(this.banPlayerModal.length == "seconds") {
                    switch(this.banPlayerModal.unit) {
                        case 1:
                            duration = this.banPlayerModal.lengthval * 60
                            break;
                        case 2:
                            duration = this.banPlayerModal.lengthval * 60 * 60
                            break;
                        case 3:
                            duration = this.banPlayerModal.lengthval * 60 * 60 * 24
                            break;
                        case 4:
                            duration = this.banPlayerModal.lengthval * 60 * 60 * 24 * 7
                            break;
                    }
                }
                axios.post('instances/' + this.$route.params.id + '/bans', {subset: this.banPlayerModal.type, id: playerid, durationType: this.banPlayerModal.length, duration: duration, reason: this.banPlayerModal.reason})
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Player banned',
                            duration: 5000,
                            text: 'The player has been banned'
                        })
                        this.banPlayerModal.reason = ""
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
            messagePlayer(playerGuid, yell) {
                axios.post('instances/' + this.$route.params.id + '/players/' + playerGuid + '/message', {message: this.messagePlayerModal.message, subset: "player", yell: yell, yellDuration: 15})
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Player messaged',
                            duration: 5000,
                            text: 'The player has been messaged'
                        })
                        this.messagePlayerModal.reason = ""
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
        },

    }
</script>
