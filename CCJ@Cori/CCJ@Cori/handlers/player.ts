import util = require('util');
import { PlayerResponse } from '../models/player'


/*
checkIn called after game session with a certain user started.
effects: none
side effects: sends a response stating user is not in an active session already
*/
export const checkIn: EPR = async (info, data, send) => {
    console.log(util.inspect(info, {showHidden: false, depth: null, colors: true}));
    console.log(util.inspect(data, {showHidden: false, depth: null, colors: true}));
    send.object(
        {
            is_login_already: K.ITEM("bool", false)
        }
    );
}
/*
saveUserdata called for saving all user profile data after authenticating with an IC card and creating a profile or concluding a play session.
effects: none
side effects: updates a saved profile or creates one if no profile for a selected ref_id exists.
*/
export const saveUserdata: EPR = async (info, data, send) => {
    //console.log(util.inspect(info, {showHidden: false, depth: null, colors: true}));
    //console.log(util.inspect(data, {showHidden: false, depth: null, colors: true}));
    const refid: string = $(data).content('ref_id');
    //console.log(refid);
    //console.log($(data).content('gachaitem'));
    //console.log(util.inspect($(data).element('pdata').obj, {showHidden: false, depth: null, colors: true}));
    //console.log(util.inspect($(data).element('pdata').elements('json').forEach((elm) =>{ elm.content('jsondata')}), {showHidden: false, depth: null, colors: true}))
    let uname: string;
    const jdata: KDataReader[] = $(data).element('pdata').elements('json');
    for (let elm of jdata) {
        if(elm.content('jsondata').includes("userName"))
            {
                uname = JSON.parse(elm.content('jsondata')).userName;
                break;
            }
    } 
    const saveData: PlayerResponse = {collection: 'profile', name: uname, pdata: $(data).element('pdata').obj, gachaitem: $(data).content('gachaitem')};
    console.log(uname)
    //console.log(util.inspect({ collection: 'data', name: uname, data: saveData}, {showHidden: false, depth: null, colors: true}))
    //console.log(await DB.Count(refid, {collection: 'profile'}))
    console.log(refid)
    await DB.Upsert<PlayerResponse>(refid, {collection: 'profile'}, saveData);
    send.success();
}

/*
CheckOut called after game session with a certain user concluded.
effects: none
side effects: sends a success response to the game client
*/
export const checkOut: EPR = async (info, data, send) => {
    //console.log(util.inspect(info, {showHidden: false, depth: null, colors: true}));
    //console.log(util.inspect(data, {showHidden: false, depth: null, colors: true}));
    send.success();
}

/*
getUserData called for getting all user profile data after authenticating with an IC card.
effects: none
side effects: sends a saved profile or an empty response if no profile for a selected ref_id exists.
*/
export const getUserData: EPR = async (info, data, send) => {
    console.log(util.inspect(info, {showHidden: false, depth: null, colors: true}));
    console.log(util.inspect(data, {showHidden: false, depth: null, colors: true}));
    const refid: string = $(data).content('ref_id');
    const profile = await DB.FindOne<PlayerResponse>(refid, {collection: 'profile'});
    let dataObj = [];
    $(profile.pdata).elements('json').forEach((elm) => {dataObj.push({json: Object.assign({}, elm.obj, {dataid: K.ITEM('s64', BigInt(2137)), updatetime:  K.ITEM('s64', BigInt(Date.now() - 30000))})})})
    //console.log(util.inspect(dataObj, {showHidden: false, depth: null, colors: true}))
    if(profile == null){
        send.object({});
    }
    else{
        send.object(
            {
                pdata: dataObj,
                gachaitem: K.ITEM('str',profile.gachaitem)
            }
        );
    }
}