import util = require('util');
import { writeFileSync } from 'fs';

type PlayerResponse = {
    collection: 'profile',
    name: string,
    pdata: object,
    gachaitem: string;
};


export const checkIn: EPR = async (info, data, send) => {
    console.log(util.inspect(info, {showHidden: false, depth: null, colors: true}));
    console.log(util.inspect(data, {showHidden: false, depth: null, colors: true}));
    send.object(
        {
            is_login_already: K.ITEM("bool", false)
        }
    );
}

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
export const saveResult: EPR = async (info, data, send) => {
    //console.log(util.inspect(info, {showHidden: false, depth: null, colors: true}));
    //console.log(util.inspect(data, {showHidden: false, depth: null, colors: true}));
    /*interface mrrp{
        info;
        data;
    };
    const meeow:mrrp = {info: info, data: data};*/
    //IO.WriteFile((Math.floor(Math.random() * 60) + 1)+'.txt',util.inspect(meeow, {showHidden: false, depth: null, colors: true, maxStringLength: null, maxArrayLength: null}));
    send.object({});
}

export const checkOut: EPR = async (info, data, send) => {
    console.log(util.inspect(info, {showHidden: false, depth: null, colors: true}));
    console.log(util.inspect(data, {showHidden: false, depth: null, colors: true}));
    send.success();
}


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