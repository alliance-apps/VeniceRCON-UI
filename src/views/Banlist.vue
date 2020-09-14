<template>
    <div>
        <CCard>
            <CCardHeader>
                <slot name="header">
                    <CIcon name="cil-ban"/> <b>Bans</b>
                    <CButton
                            class="float-right"
                            color="info"
                            square
                            size="sm"
                            :items-per-page="25"
                            @click="reloadBans()"
                    >
                        <CIcon name="cil-reload"/>
                    </CButton>

                </slot>
            </CCardHeader>
            <CCardBody>
                <CDataTable
                        bordered
                        column-filter
                        pagination
                        :items="bans"
                        :fields="fields"
                        hover
                >


                    <template #remaining="{item}">
                        <td class="py-2">
                            <span v-if="item.timeout[0] == 'perm'">Permanent</span>
                            <span v-else>{{ Math.round(item.timeout[1] / 3600) }}h {{ Math.round(item.timeout[1] % 3600 / 60) }}m</span>
                        </td>
                    </template>

                    <template #remove="{item}">
                        <td class="py-2">
                            <CButton
                                    color="primary"
                                    variant="outline"
                                    square
                                    size="sm"
                                    :disabled="!$store.getters.hasPermission('BAN#DELETE', $route.params.id)"
                                    @click="removeBan(item.subset[0], item.subset[1])"
                            >
                                <CIcon name="cil-trash"/>
                            </CButton>
                        </td>
                    </template>


                </CDataTable>
            </CCardBody>
        </CCard>


        <CCard v-if="this.$store.getters.hasPermission('BAN#CREATE', $route.params.id)">
            <CCardHeader>
                <slot name="header">
                    <CIcon name="cil-library-add"/> <b>Add ban</b>

                    <CButton
                            class="float-right"
                            color="danger"
                            label="Rounds"
                            @click="addBan()"
                            :disabled="!checkIfBanValid()"
                    >
                        Ban
                    </CButton>
                </slot>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol sm="2">
                        <CSelect
                                label="Ban type"
                                :value.sync="addban.type"
                                :options="[{value: 'name', label: 'Name'}, {value: 'guid', label: 'GUID'}, {value: 'ip', label: 'IPv4 address'}]"
                        />
                    </CCol>
                    <CCol sm="3">
                        <CInput
                                label="Name"
                                :value.sync="addban.name"
                                v-if="addban.type == 'name'"
                        />
                        <CInput
                                label="GUID"
                                :value.sync="addban.guid"
                                v-if="addban.type == 'guid'"
                        />
                        <CInput
                                label="IPv4 address"
                                :value.sync="addban.ip"
                                v-if="addban.type == 'ip'"
                        />
                    </CCol>
                    <CCol sm="3">
                        <CInput
                                label="Reason"
                                :value.sync="addban.reason"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CSelect
                                label="Length"
                                :value.sync="addban.length"
                                :options="[{value: 'perm', label: 'Permanent'}, {value: 'seconds', label: 'Temporary'}]"
                        />
                    </CCol>
                    <CCol sm="1">
                        <CInput
                                label="Length"
                                type="number"
                                :disabled="addban.length == 'perm'"
                                :value.sync="addban.lengthval"
                        />
                    </CCol>
                    <CCol sm="1">
                        <CSelect
                                label="Unit"
                                :value.sync="addban.unit"
                                :disabled="addban.length == 'perm'"
                                :options="[{value: 1, label: 'Minutes'}, {value: 2, label: 'Hours'}, {value: 3, label: 'Days'}, {value: 4, label: 'Weeks'}]"
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
        name: 'Banlist',
        props: {
            fields: {
                type: Array,
                default () {

                    return ['name', 'guid', 'ip', {key: 'remaining', filter: false}, 'reason', {key: 'remove', filter: false}]
                }
            },
        },
        components: {

        },
        data () {
            return {
                bans: [],
                addban: {
                    type: "name",
                    name: "",
                    ip: "",
                    guid: "",
                    length: "perm",
                    lengthval: 0,
                    unit: 1,
                    reason: ""
                }
            }
        },
        methods: {
            removeBan(subset, id) {
                alert(subset + ' - ' + id)
                //TODO: This is not working
                axios.delete('instances/' + this.$route.params.id + '/bans', {subset: subset, id: id})
                    .then((response) => {
                        console.log(response)
                        this.reloadBans()
                    })
                    .catch(() => {
                        alert("We couldnt log you in because fuck you")
                    })
            },
            addBan() {
                let playerid
                let duration = this.addban.lengthval
                if(this.addban.type == "name") playerid = this.addban.name
                if(this.addban.type == "guid") playerid = this.addban.guid
                if(this.addban.type == "ip") playerid = this.addban.ip
                if(this.addban.length == "seconds") {
                    switch(this.addban.unit) {
                        case 1:
                            duration = this.addban.lengthval * 60
                            break;
                        case 2:
                            duration = this.addban.lengthval * 60 * 60
                            break;
                        case 3:
                            duration = this.addban.lengthval * 60 * 60 * 24
                            break;
                        case 4:
                            duration = this.addban.lengthval * 60 * 60 * 24 * 7
                            break;
                    }
                }
                //TODO: Route needs to be fixed (duration)
                axios.post('instances/' + this.$route.params.id + '/bans', {subset: this.addban.type, id: playerid, durationType: this.addban.length, duration: duration, reason: this.addban.reason})
                    .then((response) => {
                        console.log(response)
                        this.reloadBans()
                    })
                    .catch(() => {
                        alert("We couldnt log you in because fuck you")
                    })
            },
            checkIfBanValid() {
                if(this.addban.length != 'perm' && this.addban.lengthval <= 0) return false
                if(this.addban.type == "name" && this.addban.name.length < 1) return false
                if(this.addban.type == "ip")
                    if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.addban.ip)) return false
                if(this.addban.type == "guid") {
                    //TODO: Check GUID validity
                }
                return true
            },
            reloadBans() {
                axios.get('instances/' + this.$route.params.id + '/bans')
                    .then((response) => {
                        this.bans = response.data
                        for(let i = 0; i < this.bans.length; i++) {
                            if(this.bans[i].subset[0] == "name") {
                                this.bans[i].name = this.bans[i].subset[1]
                                this.bans[i].guid = ""
                                this.bans[i].ip = ""
                            }
                            if(this.bans[i].subset[0] == "guid") {
                                this.bans[i].name = ""
                                this.bans[i].guid = this.bans[i].subset[1]
                                this.bans[i].ip = ""
                            }
                            if(this.bans[i].subset[0] == "ip") {
                                this.bans[i].name = ""
                                this.bans[i].guid = ""
                                this.bans[i].ip = this.bans[i].subset[1]
                            }
                        }
                    })
                    .catch(() => {
                        alert("We couldnt log you in because fuck you")
                    })
            }
        },
        mounted() {
            this.reloadBans()
        }
    }
</script>
