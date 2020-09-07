<template>
    <div>
        <CAlert color="warning">
            Changes here are not persistent and will be reset after server restart. Please use Startup.txt for persistent changes.
        </CAlert>
        <CRow>
            <CCol sm="4">
                <CInput
                        label="Server name"
                        v-model="vars.serverName"
                />
            </CCol>
            <CCol sm="4">
                <CInput
                        label="Server description"
                        v-model="vars.serverDescription"
                />
            </CCol>
            <CCol sm="4">
                <CInput
                        label="Server message"
                        v-model="vars.serverMessage"
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
                <label for="killCam">Killcam</label>
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
                        id="premiumStatus"
                        v-model="vars.premiumStatus"
                />&emsp;
                <label for="premiumStatus">Premium</label>
            </CCol>
            <CCol sm="2">
                <input
                        type="checkbox"
                        id="ranked"
                        v-model="vars.ranked"
                />&emsp;
                <label for="ranked">Ranked</label>
            </CCol>
        </CRow>


        <CRow>
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
                        label="Vehicle spawn delay"
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
                        label="Player respawn time"
                        v-model="vars.playerRespawnTime"
                />
            </CCol>
            <CCol sm="2">
                <CInput
                        label="Player man down time"
                        v-model="vars.playerManDownTime"
                />
            </CCol>
            <CCol sm="2">
                <CInput
                        label="Bullet damage"
                        v-model="vars.bulletDamage"
                />
            </CCol>
            <CCol sm="2">
                <CInput
                        label="Game mode counter"
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
        </CRow>


        {{ vars }}
    </div>
</template>

<script>
    export default {
        name: 'Configuration',
        components: {

        },
        data () {
            return {
                vars: null,
                vars2: {
                    serverName: "AllianceApps DEV Server",
                    autoBalance: true,
                    friendlyFire: false,
                    maxPlayers: 64,
                    serverDescription: "This is a description",
                    serverMessage: "",
                    killCam: true,
                    miniMap: true,
                    hud: true,
                    threeDSpotting: true,
                    miniMapSpotting: true,
                    nametag: true,
                    thirdPCam:true,
                    regenerateHealth: true,
                    teamKillCountForKick: 5,
                    teamKillValueForKick: 4.0999999,
                    teamKillValueIncrease: 1,
                    teamKillValueDecreasePerSecond: 0.0500000007,
                    teamKillKickForBan: 0,
                    idleTimeout: 300,
                    idleBanRounds: 0,
                    roundStartPlayerCount: -1,
                    roundRestartPlayerCount: -1,
                    roundLockdownCountdown: 15,
                    vehicleSpawnAllowed: true,
                    vehicleSpawnDelay: 100,
                    soldierHealth: 100,
                    playerRespawnTime: 100,
                    playerManDownTime: 100,
                    bulletDamage: 100,
                    gameModeCounter: 100,
                    onlySquadLeaderSpawn: false,
                    premiumStatus: false,
                    gunMasterWeaponsPreset: 0,
                    ranked:false,
                    unlockMode:0
                }
            }
        },
        methods: {

        },
        mounted() {
            this.vars = JSON.parse(JSON.stringify((this.$store.state.instances[this.$route.params.id].vars)))
        }
    }
</script>
