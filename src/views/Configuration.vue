<template>
    <div>
        <CAlert color="warning" v-show="$store.getters.hasPermission('VARIABLE#MODIFY', $route.params.id)">
            Changes here are not persistent and will be reset after server restart. Please use Startup.txt for persistent changes.
        </CAlert>
        <CAlert color="warning" v-show="!$store.getters.hasPermission('VARIABLE#MODIFY', $route.params.id)">
            You do not have permission to change these values. Please use Startup.txt for persistent changes.
        </CAlert>

        <CCard v-if="vars">
            <CCardHeader>
                <slot name="header">
                    <CIcon name="cil-settings"/> <b>Configuration</b>

                    <div class="float-right">
                        <CButton
                                @click="generateConfigFile()"
                                square
                                size="sm"
                                color="secondary"
                                v-c-popover="{
                                    header: 'Copied to clipboard!',
                                    content: 'Paste into your servers Startup.txt',
                                    placement: 'top-end'
                                  }"
                        >
                            <CIcon name="cil-copy"/>&nbsp;Copy Startup.txt
                        </CButton>
                        &nbsp;
                        <CButton
                                color="success"
                                square
                                size="sm"
                                :disabled="!$store.getters.hasPermission('VARIABLE#MODIFY', $route.params.id)"
                                @click="applyConfig()"
                        >
                            <CIcon name="cil-save"/>&nbsp;Save
                        </CButton>
                    </div>
                </slot>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol sm="3">
                        <CInput
                                label="Server name"
                                v-model="vars.vars_serverName"
                        />
                    </CCol>
                    <CCol sm="3">
                        <CInput
                                label="Server description"
                                v-model="vars.vars_serverDescription"
                        />
                    </CCol>
                    <CCol sm="3">
                        <CInput
                                label="Server message"
                                v-model="vars.vars_serverMessage"
                        />
                    </CCol>
                    <CCol sm="3">
                        <CInput
                                label="Game password"
                                v-model="vars.vars_gamePassword"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="autoBalance"
                                v-model="vars.vars_autoBalance"
                        />&emsp;
                        <label for="autoBalance">Autobalance</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="friendlyFire"
                                v-model="vars.vars_friendlyFire"
                        />&emsp;
                        <label for="friendlyFire">Friendly Fire</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="killCam"
                                v-model="vars.vars_killCam"
                        />&emsp;
                        <label for="killCam">Kill Cam</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="miniMap"
                                v-model="vars.vars_miniMap"
                        />&emsp;
                        <label for="miniMap">Minimap</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="hud"
                                v-model="vars.vars_hud"
                        />&emsp;
                        <label for="hud">HUD</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="3dSpotting"
                                v-model="vars['vars_3dSpotting']"
                        />&emsp;
                        <label for="3dSpotting">3D spotting</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="miniMapSpotting"
                                v-model="vars.vars_miniMapSpotting"
                        />&emsp;
                        <label for="miniMapSpotting">Minimap spotting</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="nametag"
                                v-model="vars.vars_nametag"
                        />&emsp;
                        <label for="nametag">Nametag</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="3pCam"
                                v-model="vars['vars_3pCam']"
                        />&emsp;
                        <label for="3pCam">3rd person cam</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="regenerateHealth"
                                v-model="vars.vars_regenerateHealth"
                        />&emsp;
                        <label for="regenerateHealth">Regenerate health</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="vehicleSpawnAllowed"
                                v-model="vars.vars_vehicleSpawnAllowed"
                        />&emsp;
                        <label for="vehicleSpawnAllowed">Vehicle spawn</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="onlySquadLeaderSpawn"
                                v-model="vars.vars_onlySquadLeaderSpawn"
                        />&emsp;
                        <label for="onlySquadLeaderSpawn">Only squad leader spawn</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="ranked"
                                :disabled="$store.state.instances[$route.params.id].version === 'VU'"
                                v-model="vars.vars_ranked"
                        />&emsp;
                        <label for="ranked">Ranked</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="premium"
                                :disabled="$store.state.instances[$route.params.id].version === 'VU'"
                                v-model="vars.vars_premiumStatus"
                        />&emsp;
                        <label for="premium">Premium</label>
                    </CCol>
                    <CCol sm="2" v-show="$store.state.instances[$route.params.id].version === 'VU'">
                        <input
                                type="checkbox"
                                id="DestructionEnabled"
                                v-model="vars.vu_DestructionEnabled"
                        />&emsp;
                        <label for="DestructionEnabled">Destruction</label>
                    </CCol>
                    <CCol sm="2" v-show="$store.state.instances[$route.params.id].version === 'VU'">
                        <input
                                type="checkbox"
                                id="DesertingAllowed"
                                v-model="vars.vu_DesertingAllowed"
                        />&emsp;
                        <label for="DesertingAllowed">Allow deserting</label>
                    </CCol>
                    <CCol sm="2" v-show="$store.state.instances[$route.params.id].version === 'VU'">
                        <input
                                type="checkbox"
                                id="VehicleDisablingEnabled"
                                v-model="vars.vu_VehicleDisablingEnabled"
                        />&emsp;
                        <label for="VehicleDisablingEnabled">Vehicle disabling</label>
                    </CCol>
                    <CCol sm="2" v-show="$store.state.instances[$route.params.id].version === 'VU'">
                        <input
                                type="checkbox"
                                id="HighPerformanceReplication"
                                v-model="vars.vu_HighPerformanceReplication"
                        />&emsp;
                        <label for="HighPerformanceReplication">High Perf. Repl.</label>
                    </CCol>
                    <CCol sm="2" v-show="$store.state.instances[$route.params.id].version === 'VU'">
                        <input
                                type="checkbox"
                                id="SunFlareEnabled"
                                v-model="vars.vu_SunFlareEnabled"
                        />&emsp;
                        <label for="SunFlareEnabled">Sun Flare</label>
                    </CCol>
                    <CCol sm="2" v-show="$store.state.instances[$route.params.id].version === 'VU'">
                        <input
                                type="checkbox"
                                id="ColorCorrectionEnabled"
                                v-model="vars.vu_ColorCorrectionEnabled"
                        />&emsp;
                        <label for="ColorCorrectionEnabled">Color Correction</label>
                    </CCol>
                </CRow>


                <CRow>
                    <CCol sm="2">
                        <CInput
                                label="Slots"
                                v-model="vars.vars_maxPlayers"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Team kill count for kick"
                                v-model="vars.vars_teamKillCountForKick"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Team kill value for kick"
                                v-model="vars.vars_teamKillValueForKick"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Team kill value increase"
                                v-model="vars.vars_teamKillValueIncrease"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Team kill value decrease/s"
                                v-model="vars.vars_teamKillValueDecreasePerSecond"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Team kill kick for ban"
                                v-model="vars.vars_teamKillKickForBan"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Idle timeout (seconds)"
                                v-model="vars.vars_idleTimeout"
                        />
                    </CCol>

                    <CCol sm="2">
                        <CInput
                                label="Idle ban rounds"
                                v-model="vars.vars_idleBanRounds"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Round start player count"
                                v-model="vars.vars_roundStartPlayerCount"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Round restart player count"
                                v-model="vars.vars_roundRestartPlayerCount"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Round lockdown countdown"
                                v-model="vars.vars_roundLockdownCountdown"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Vehicle spawn delay (%)"
                                v-model="vars.vars_vehicleSpawnDelay"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Soldier health (%)"
                                v-model="vars.vars_soldierHealth"
                        />
                    </CCol>

                    <CCol sm="2">
                        <CInput
                                label="Player respawn time (%)"
                                v-model="vars.vars_playerRespawnTime"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Player man down time (%)"
                                v-model="vars.vars_playerManDownTime"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Bullet damage (%)"
                                v-model="vars.vars_bulletDamage"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Tickets (%)"
                                v-model="vars.vars_gameModeCounter"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Gunmaster weapons preset"
                                v-model="vars.vars_gunMasterWeaponsPreset"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Unlock mode"
                                v-model="vars.vars_unlockMode"
                        />
                    </CCol>
                    <CCol sm="2" v-show="$store.state.instances[$route.params.id].version === 'VU'">
                        <CInput
                                label="Suppression Multiplier (%)"
                                v-model="vars.vu_SuppressionMultiplier"
                        />
                    </CCol>
                    <CCol sm="2" v-show="$store.state.instances[$route.params.id].version === 'VU'">
                        <CInput
                                label="Time Scale"
                                v-model="vars.vu_TimeScale"
                        />
                    </CCol>
                    <CCol sm="2" v-show="$store.state.instances[$route.params.id].version === 'VU'">
                        <CInput
                                label="Squad size"
                                v-model="vars.vu_SquadSize"
                        />
                    </CCol>
                    <CCol sm="4" v-show="$store.state.instances[$route.params.id].version === 'VU'">
                        <CInput
                                label="Server banner URL"
                                v-model="vars.vu_ServerBanner"
                        />
                    </CCol>
                </CRow>

            </CCardBody>
        </CCard>

        {{ changedVars() }}


    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Configuration',
        components: {

        },
        data () {
            return {
                vars: null,
                vars_pre: null,
                startupTxt: false
            }
        },
        methods: {
            changedVars() {
                if(this.vars === null) return []
                let toCheck = Object.getOwnPropertyNames(this.vars)
                let changed = []
                for(let i = 0; i < toCheck.length; i++) {
                    if(this.vars[toCheck[i]] !== this.vars_pre[toCheck[i]]) {
                        if(toCheck[i] === "0") continue //TODO: Remove this hotfix
                        if(toCheck[i] === "__ob__") continue //TODO: Remove this hotfix
                        changed.push(toCheck[i])
                    }
                }
                return changed
            },
            applyConfig() {
                let changed = this.changedVars()
                let submit = {}
                for (let i = 0; i < changed.length; i++) {
                    submit[changed[i].replace('_', '.')] = this.vars[changed[i]]
                }

                axios.patch('instances/' + this.$route.params.id + '/vars', submit)
                    .then(() => {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Configuration updated',
                            duration: 5000,
                            text: 'Changes may require a round restart'
                        });
                        this.getConfig()
                    })
                    .catch((error) => {
                        if(error.response) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Configuration error',
                                duration: 5000,
                                text: error.response.data
                            });
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Configuration error',
                                duration: 5000,
                                text: 'Something went wrong...'
                            });
                        }
                        this.getConfig()
                    })

            },
            generateConfigFile() {
                if(this.vars === null) return ""
                let toCheck = Object.getOwnPropertyNames(this.vars)
                let changed = ""
                changed += "# WATCH OUT: This config does not contain admin.password\r\n"
                changed += "# If you replace your config with these values, keep the admin.password or RCON will not work anymore.\r\n"
                for(let i = 0; i < toCheck.length - 1; i++) {
                    changed += toCheck[i].replace('_', '.') + " \"" + this.vars[toCheck[i]] + "\"\r\n"
                }
                let dummy = document.createElement("textarea");
                document.body.appendChild(dummy);
                dummy.value = changed;
                dummy.select();
                document.execCommand("copy");
                document.body.removeChild(dummy);
            },
            getConfig() {
                axios.get('instances/' + this.$route.params.id + '/vars')
                    .then((response) => {
                        let vars = response.data
                        delete vars[0]
                        let toCheck = Object.getOwnPropertyNames(vars)
                        for(let i = 0; i < toCheck.length; i++) {
                            //if(!isNaN(vars[toCheck[i]])) vars[toCheck[i]] = parseInt(vars[toCheck[i]])
                            if(vars[toCheck[i]] == "true") {
                                vars[toCheck[i]] = true
                            }
                            if(vars[toCheck[i]] == "false") {
                                vars[toCheck[i]] = false
                            }
                        }

                        this.vars = vars
                        this.vars_pre = JSON.parse(JSON.stringify(vars))
                    })
                    .catch((error) => {
                        if(error.response) {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Configuration error',
                                duration: 5000,
                                text: error.response.data.message
                            });
                        } else {
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Configuration error',
                                duration: 5000,
                                text: 'Something went wrong...'
                            });
                        }
                    })
            }
        },
        mounted() {
            this.getConfig()
        }
    }
</script>
