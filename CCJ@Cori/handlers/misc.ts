import { writeFileSync } from 'fs';
/*
saveResult called for saving debug and game client opperation data.
effects: none
side effects: sends an empty response. Can save all recieved info onto drive whaen configured in webui.
*/
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