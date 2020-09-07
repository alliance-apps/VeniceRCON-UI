import Vue from 'vue'

const cdnBaseUrl = "https://eaassets-a.akamaihd.net/bl-cdn/cdnprefix/production-284-20170531/public/base/bf3/map_images/992x164/"

const mapData = {
    "MP_001": {"display_name": "Grand Bazaar", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0"]},
    "MP_003": {"display_name": "Teheran Highway", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0"]},
    "MP_007": {"display_name": "Caspian Border", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0"]},
    "MP_011": {"display_name": "Seine Crossing", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0"]},
    "MP_012": {"display_name": "Operation Firestorm", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0"]},
    "MP_013": {"display_name": "Damavand Peak", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0"]},
    "MP_017": {"display_name": "Noshahr Canals", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0"]},
    "MP_018": {"display_name": "Kharg Island", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0"]},
    "MP_Subway": {"display_name": "Operation Metro", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0"]},
    "XP1_001": {"display_name": "Strike at Karkand", "supported_gamemodes": ["ConquestAssaultLarge0", "ConquestAssaultSmall0", "ConquestAssaultSmall1", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0"]},
    "XP1_002": {"display_name": "Gulf of Oman", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "ConquestAssaultSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0"]},
    "XP1_003": {"display_name": "Sharqi Peninsula", "supported_gamemodes": ["ConquestAssaultLarge0", "ConquestAssaultSmall0", "ConquestAssaultSmall1", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0"]},
    "XP1_004": {"display_name": "Wake Island", "supported_gamemodes": ["ConquestAssaultLarge0", "ConquestAssaultSmall0", "ConquestAssaultSmall1", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0"]},
    "XP2_Factory": {"display_name": "Scrapmetal", "supported_gamemodes": ["TeamDeathMatchC0", "GunMaster0", "Domination0", "SquadDeathMatch0"]},
    "XP2_Office": {"display_name": "Operation 925", "supported_gamemodes": ["TeamDeathMatchC0", "GunMaster0", "Domination0", "SquadDeathMatch0"]},
    "XP2_Palace": {"display_name": "Donya Fortress", "supported_gamemodes": ["TeamDeathMatchC0", "GunMaster0", "Domination0", "SquadDeathMatch0"]},
    "XP2_Skybar": {"display_name": "Ziba Tower", "supported_gamemodes": ["TeamDeathMatchC0", "GunMaster0", "Domination0", "SquadDeathMatch0"]},
    "XP3_Desert": {"display_name": "Bandar Desert", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0", "TankSuperiority0"]},
    "XP3_Alborz": {"display_name": "Alborz Mountains", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0", "TankSuperiority0"]},
    "XP3_Shield": {"display_name": "Armored Shield", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0", "TankSuperiority0"]},
    "XP3_Valley": {"display_name": "Death Valley", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0", "TankSuperiority0"]},
    "XP4_Quake": {"display_name": "Epicenter", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0", "GunMaster0", "Scavenger0"]},
    "XP4_FD": {"display_name": "Markaz Monolith", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0", "GunMaster0", "Scavenger0"]},
    "XP4_Parl": {"display_name": "Azadi Palace", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0", "GunMaster0", "Scavenger0"]},
    "XP4_Rubble": {"display_name": "Talah Market", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0", "GunMaster0", "Scavenger0"]},
    "XP5_001": {"display_name": "Operation Riverside", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0", "CaptureTheFlag0", "AirSuperiority0"]},
    "XP5_002": {"display_name": "Nebandan Flats", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0", "CaptureTheFlag0", "AirSuperiority0"]},
    "XP5_003": {"display_name": "Kiasar Railroad", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0", "CaptureTheFlag0", "AirSuperiority0"]},
    "XP5_004": {"display_name": "Sabalan Pipeline", "supported_gamemodes": ["ConquestLarge0", "ConquestSmall0", "RushLarge0", "SquadRush0", "SquadDeathMatch0", "TeamDeathMatch0", "CaptureTheFlag0", "AirSuperiority0"]},
}

const gamemodeData = {
    "ConquestLarge0": {"display_name": "Conquest 64"},
    "ConquestSmall0": {"display_name": "Conquest"},
    "ConquestAssaultLarge0": {"display_name": "Conquest Assault 64"},
    "ConquestAssaultSmall0": {"display_name": "Conquest Assault"},
    "ConquestAssaultSmall1": {"display_name": "Conquest Assault (alt.)"},
    "RushLarge0": {"display_name": "Rush"},
    "SquadRush0": {"display_name": "Squad Rush"},
    "SquadDeathMatch0": {"display_name": "Squad Deathmatch"},
    "TeamDeathMatch0": {"display_name": "Team Deathmatch"},
    "TeamDeathMatchC0": {"display_name": "Team DM Close Quarters"},
    "Domination0": {"display_name": "Conquest Domination"},
    "GunMaster0": {"display_name": "Gun Master"},
    "TankSuperiority0": {"display_name": "Tank Superiority"},
    "Scavenger0": {"display_name": "Scavenger"},
    "CaptureTheFlag0": {"display_name": "Capture the Flag"},
    "AirSuperiority0": {"display_name": "Air Superiority"},
}

const coopSPMaps = {
    "Coop_002": {"display_name": "Hit and Run"},
    "Coop_003": {"display_name": "Drop 'Em Like Liquid"},
    "Coop_006": {"display_name": "Fire from the Sky"},
    "Coop_007": {"display_name": "Operation Exodus"},
    "Coop_009": {"display_name": "Exfiltration"},
    "Coop_010": {"display_name": "The Eleventh Hour"},
    "SP_Bank": {"display_name": "Operation Guillotine"},
    "SP_Earthquake": {"display_name": "Operation Swordbreaker"},
    "SP_Earthquake2": {"display_name": "Uprising"},
    "SP_Finale": {"display_name": "The Great Destroyer"},
    "SP_Interrogation": {"display_name": "Intro"},
    "SP_Jet": {"display_name": "Going Hunting"},
    "SP_New_York": {"display_name": "Semper Fidelis"},
    "SP_Paris": {"display_name": "Comrades"},
    "SP_Sniper": {"display_name": "Night Shift"},
    "SP_Tank": {"display_name": "Thunder Run"},
    "SP_Tank_b": {"display_name": "Fear No Evil"},
    "SP_Valley": {"display_name": "Rock and a Hard Place"},
    "SP_Villa": {"display_name": "Kaffarov"},
}



Vue.prototype.$bf3_getMapImage = (map) => {return "https://eaassets-a.akamaihd.net/bl-cdn/cdnprefix/production-284-20170531/public/base/bf3/map_images/992x164/mp_013.jpg"}
Vue.prototype.$bf3_getMapDisplayName = (map) => {
    if(mapData[map])
        return mapData[map].display_name
    else
        return map
}
Vue.prototype.$bf3_getGamemodeDisplayName = (gamemode) => {
    if(gamemodeData[gamemode])
        return gamemodeData[gamemode].display_name
    else
        return gamemode
}
Vue.prototype.$bf3_getAllAvailableMapsForSelect = () => {
    let maps = Object.getOwnPropertyNames(mapData)
    let mapsForSelect = []
    maps.forEach(function (map) {
        mapsForSelect.push({value: map, label: mapData[map].display_name + ' (' + map + ')'})
    })
    Object.getOwnPropertyNames(coopSPMaps).forEach(function (map) {
        mapsForSelect.push({value: map, label: coopSPMaps[map].display_name + ' (' + map + ')'})
    })
    return mapsForSelect
}

Vue.prototype.$bf3_getAllAvailableGamemodesForSelect = () => {
    let gamemodes = Object.getOwnPropertyNames(gamemodeData)
    let gamemodesForSelect = []
    gamemodes.forEach(function (gamemode) {
        gamemodesForSelect.push({value: gamemode, label: gamemodeData[gamemode].display_name})
    })
    return gamemodesForSelect
}

Vue.prototype.$bf3_isSPCoopMap = (map) => {
    return coopSPMaps[map] != null
}

Vue.prototype.$bf3_isMapGmCombinationPossible = (map, gamemode) => {
    if(coopSPMaps[map]) return true
    return mapData[map].supported_gamemodes.includes(gamemode)
}