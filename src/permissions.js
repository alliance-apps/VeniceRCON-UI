const permissions = [
    {"value": "INSTANCE#ACCESS", "display": "Access instance"},
    {"value": "INSTANCE#CREATE", "display": "Create instance"},
    {"value": "INSTANCE#DELETE", "display": "Delete instance"},
    {"value": "INSTANCE#UPDATE", "display": "Update instance"},
    {"value": "INSTANCE#LOGS", "display": "Logs"},
    {"value": "INSTANCE#CONSOLE", "display": "Console"},
    {"value": "INSTANCEUSER#ACCESS", "display": "User management access"},
    {"value": "INSTANCEUSER#CREATE", "display": "Invite users"},
    {"value": "INSTANCEUSER#UPDATE", "display": "Update user permissions"},
    {"value": "INSTANCEUSER#REMOVE", "display": "Remove user"},
    {"value": "PLAYER#KILL", "display": "Kill player"},
    {"value": "PLAYER#KICK", "display": "Kick player"},
    {"value": "PLAYER#MESSAGE", "display": "Message player"},
    {"value": "PLAYER#MOVE", "display": "Move player"},
    {"value": "BAN#ACCESS", "display": "Banlist"},
    {"value": "BAN#CREATE", "display": "Ban player"},
    {"value": "BAN#DELETE", "display": "Remove ban"},
    {"value": "MAP#SWITCH", "display": "Switch maps"},
    {"value": "MAP#MANAGE", "display": "Manage maplist"},
    {"value": "PLUGIN#ACCESS", "display": "Plugins"},
    {"value": "PLUGIN#MODIFY", "display": "Modify plugin settings"},
    {"value": "PLUGIN#CREATE", "display": "Add plugin"},
    {"value": "PLUGIN#REMOVE", "display": "Remove plugin"},
    {"value": "RESERVEDSLOT#ACCESS", "display": "Reserved slots"},
    {"value": "RESERVEDSLOT#CREATE", "display": "Add reserved slot"},
    {"value": "RESERVEDSLOT#DELETE", "display": "Remove reserved slot"},
    {"value": "VARIABLE#MODIFY", "display": "Modify server settings (variables)"},
    {"value": "EVENT#CHAT", "display": "Chat"},
    {"value": "EVENT#KILL", "display": "Kills"},
    {"value": "MOD#ACCESS", "display": "Modlist"},
    {"value": "MOD#CREATE", "display": "Enable mod"},
    {"value": "MOD#DELETE", "display": "Disable mod"},
    {"value": "MOD#UPDATE", "display": "Reload mods"},
];

const getters = {
    listPermissions() {
        let output = []
        permissions.forEach((permission) => {output.push(permission.value)})
        return output
    },
    getDescription(value) {
        let lol = permissions.filter(perm => perm.value === value)[0]
        if(!lol) return "UNDEFINED " + value
        return lol.display
    }

}
export default {
    permissions,
    getters
}