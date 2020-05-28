import axios from 'axios';

const base = /*process.env.MIX_API_URL + */ '/players/';

/*
 * Gets all players matching values
 *
 * @param object body
 * @return object
 */
export function getPlayers (body = {}) {
    return axios.get(base, {
        params: body
    }).then(response => {
        return response.data;
    });
}
/*
 * Gets all information to a player
 *
 * @param integer uid
 * @return object
 */
export function getPlayerInfo (uid) {
    return axios.get(base + uid).then(response => {
        return response.data;
    });
}
