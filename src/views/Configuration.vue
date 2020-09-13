<template>
    <div>
        <CAlert color="warning" v-if="$store.getters.hasPermission['VARIABLE#MODIFY']">
            Changes here are not persistent and will be reset after server restart. Please use Startup.txt for persistent changes.
        </CAlert>
        <CAlert color="warning" v-else>
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
                                :disabled="!$store.getters.hasPermission['VARIABLE#MODIFY']"
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
                                v-model="vars.serverName"
                        />
                    </CCol>
                    <CCol sm="3">
                        <CInput
                                label="Server description"
                                v-model="vars.serverDescription"
                        />
                    </CCol>
                    <CCol sm="3">
                        <CInput
                                label="Server message"
                                v-model="vars.serverMessage"
                        />
                    </CCol>
                    <CCol sm="3">
                        <CInput
                                label="Game password"
                                v-model="vars.gamePassword"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="autoBalance"
                                v-model="vars.autoBalance"
                        />&emsp;
                        <label for="autoBalance">Autobalance</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="friendlyFire"
                                v-model="vars.friendlyFire"
                        />&emsp;
                        <label for="friendlyFire">Friendly Fire</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="killCam"
                                v-model="vars.killCam"
                        />&emsp;
                        <label for="killCam">Kill Cam</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="miniMap"
                                v-model="vars.miniMap"
                        />&emsp;
                        <label for="miniMap">Minimap</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="hud"
                                v-model="vars.hud"
                        />&emsp;
                        <label for="hud">HUD</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="3dSpotting"
                                v-model="vars['3dSpotting']"
                        />&emsp;
                        <label for="3dSpotting">3D spotting</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="miniMapSpotting"
                                v-model="vars.miniMapSpotting"
                        />&emsp;
                        <label for="miniMapSpotting">Minimap spotting</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="nametag"
                                v-model="vars.nametag"
                        />&emsp;
                        <label for="nametag">Nametag</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="3pCam"
                                v-model="vars['3pCam']"
                        />&emsp;
                        <label for="3pCam">3rd person cam</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="regenerateHealth"
                                v-model="vars.regenerateHealth"
                        />&emsp;
                        <label for="regenerateHealth">Regenerate health</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="vehicleSpawnAllowed"
                                v-model="vars.vehicleSpawnAllowed"
                        />&emsp;
                        <label for="vehicleSpawnAllowed">Vehicle spawn</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="onlySquadLeaderSpawn"
                                v-model="vars.onlySquadLeaderSpawn"
                        />&emsp;
                        <label for="onlySquadLeaderSpawn">Only squad leader spawn</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="ranked"
                                :disabled="$store.state.instances[$route.params.id].version == 'VU'"
                                v-model="vars.ranked"
                        />&emsp;
                        <label for="ranked">Ranked</label>
                    </CCol>
                    <CCol sm="2">
                        <input
                                type="checkbox"
                                id="premium"
                                :disabled="$store.state.instances[$route.params.id].version == 'VU'"
                                v-model="vars.premiumStatus"
                        />&emsp;
                        <label for="premium">Premium</label>
                    </CCol>
                    <CCol sm="2" v-if="$store.state.instances[$route.params.id].version == 'VU'">
                        <input
                                type="checkbox"
                                id="DestructionEnabled"
                                v-model="vars.DestructionEnabled"
                        />&emsp;
                        <label for="DestructionEnabled">Destruction</label>
                    </CCol>
                    <CCol sm="2" v-if="$store.state.instances[$route.params.id].version == 'VU'">
                        <input
                                type="checkbox"
                                id="DesertingAllowed"
                                v-model="vars.DesertingAllowed"
                        />&emsp;
                        <label for="DesertingAllowed">Allow deserting</label>
                    </CCol>
                    <CCol sm="2" v-if="$store.state.instances[$route.params.id].version == 'VU'">
                        <input
                                type="checkbox"
                                id="VehicleDisablingEnabled"
                                v-model="vars.VehicleDisablingEnabled"
                        />&emsp;
                        <label for="VehicleDisablingEnabled">Vehicle disabling</label>
                    </CCol>
                    <CCol sm="2" v-if="$store.state.instances[$route.params.id].version == 'VU'">
                        <input
                                type="checkbox"
                                id="HighPerformanceReplication"
                                v-model="vars.HighPerformanceReplication"
                        />&emsp;
                        <label for="HighPerformanceReplication">High Perf. Repl.</label>
                    </CCol>
                    <CCol sm="2" v-if="$store.state.instances[$route.params.id].version == 'VU'">
                        <input
                                type="checkbox"
                                id="SunFlareEnabled"
                                v-model="vars.SunFlareEnabled"
                        />&emsp;
                        <label for="SunFlareEnabled">Sun Flare</label>
                    </CCol>
                    <CCol sm="2" v-if="$store.state.instances[$route.params.id].version == 'VU'">
                        <input
                                type="checkbox"
                                id="ColorCorrectionEnabled"
                                v-model="vars.ColorCorrectionEnabled"
                        />&emsp;
                        <label for="SunFlareEnabled">Color Correction</label>
                    </CCol>
                    <CCol sm="2" v-if="$store.state.instances[$route.params.id].version == 'VU'">
                        <input
                                type="checkbox"
                                id="SpawnProtectionEnabled"
                                v-model="vars.SpawnProtectionEnabled"
                        />&emsp;
                        <label for="SunFlareEnabled">Spawn protection</label>
                    </CCol>
                </CRow>


                <CRow>
                    <CCol sm="2">
                        <CInput
                                label="Slots"
                                v-model="vars.maxPlayers"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Team kill count for kick"
                                v-model="vars.teamKillCountForKick"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Team kill value for kick"
                                v-model="vars.teamKillValueForKick"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Team kill value increase"
                                v-model="vars.teamKillValueIncrease"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Team kill value decrease/s"
                                v-model="vars.teamKillValueDecreasePerSecond"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Team kill kick for ban"
                                v-model="vars.teamKillKickForBan"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Idle timeout (seconds)"
                                v-model="vars.idleTimeout"
                        />
                    </CCol>

                    <CCol sm="2">
                        <CInput
                                label="Idle ban rounds"
                                v-model="vars.idleBanRounds"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Round start player count"
                                v-model="vars.roundStartPlayerCount"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Round restart player count"
                                v-model="vars.roundRestartPlayerCount"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Round lockdown countdown"
                                v-model="vars.roundLockdownCountdown"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Vehicle spawn delay (%)"
                                v-model="vars.vehicleSpawnDelay"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Soldier health (%)"
                                v-model="vars.soldierHealth"
                        />
                    </CCol>

                    <CCol sm="2">
                        <CInput
                                label="Player respawn time (%)"
                                v-model="vars.playerRespawnTime"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Player man down time (%)"
                                v-model="vars.playerManDownTime"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Bullet damage (%)"
                                v-model="vars.bulletDamage"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Tickets (%)"
                                v-model="vars.gameModeCounter"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Gunmaster weapons preset"
                                v-model="vars.gunMasterWeaponsPreset"
                        />
                    </CCol>
                    <CCol sm="2">
                        <CInput
                                label="Unlock mode"
                                v-model="vars.unlockMode"
                        />
                    </CCol>
                    <CCol sm="2" v-if="$store.state.instances[$route.params.id].version == 'VU'">
                        <CInput
                                label="Suppression Multiplier (%)"
                                v-model="vars.SuppressionMultiplier"
                        />
                    </CCol>
                    <CCol sm="2" v-if="$store.state.instances[$route.params.id].version == 'VU'">
                        <CInput
                                label="Time Scale"
                                v-model="vars.TimeScale"
                        />
                    </CCol>
                    <CCol sm="2" v-if="$store.state.instances[$route.params.id].version == 'VU'">
                        <CInput
                                label="Squad size"
                                v-model="vars.SquadSize"
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
                    if(this.vars[toCheck[i]] != this.vars_pre[toCheck[i]]) {
                        if(toCheck[i] == "0") continue //TODO: Remove this hotfix
                        if(toCheck[i] == "__ob__") continue //TODO: Remove this hotfix
                        changed.push(toCheck[i])
                    }
                }
                return changed
            },
            applyConfig() {
                let changed = this.changedVars()
                let submit = {}
                for (let i = 0; i < changed.length; i++) {
                    submit[changed[i]] = this.vars[changed[i]]
                }

                axios.patch('instances/' + this.$route.params.id + '/vars', submit)
                    .then(() => {
                        this.getConfig()
                    })
                    .catch(() => {
                        this.getConfig()
                    })

            },
            generateConfigFile() {
                if(this.vars === null) return ""
                let toCheck = Object.getOwnPropertyNames(this.vars)
                let changed = ""
                for(let i = 0; i < toCheck.length - 1; i++) {
                    changed += "vars." + toCheck[i] + " \"" + this.vars[toCheck[i]] + "\"\r\n"

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
                    .catch(() => {
                        alert("We couldnt log you in because fuck you")
                    })
            }
        },
        mounted() {
            this.getConfig()
        }
    }
</script>
