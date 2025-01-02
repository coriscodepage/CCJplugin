import util = require('util');

let ipp: string;
let portt: number;
let timestamp: bigint;
let mrrp = 0;

export const matchMake: EPR = async (info, data, send) => {
    //console.log(util.inspect(info, {showHidden: false, depth: null, colors: true}));
    //console.log(util.inspect(data, {showHidden: false, depth: null, colors: true}));

    //send.xmlFile('xml/getGachaSchedule.xml');
    if(mrrp==0){
    ipp = $(data).content('globalip');
    portt = $(data).content('globalport');
    timestamp = BigInt(Date.now() + 300000);
    console.log(timestamp);
    mrrp = 1;
    send.object(
        {
            matchid: K.ITEM("s32", 2137),
            jointype: K.ITEM("s32", 1),
            globalip: K.ITEM("str", ipp),
            globalport: K.ITEM("s32", portt),
            hostouttime: K.ITEM("s64", timestamp)
        }
    );
    }
    else {
        send.object(
            {
                matchid: K.ITEM("s32", 2137),
                jointype: K.ITEM("s32", 2),
                globalip: K.ITEM("str", ipp),
                globalport: K.ITEM("s32", portt),
                hostouttime: K.ITEM("s64", timestamp)
            }
        );
    }
}