
export const pcbBoot: EPR = async (info, data, send) => {

  send.xmlFile('xml/pcbBoot.xml');

};

export const getGachaSchedule: EPR = async (info, data, send) => {

  send.xmlFile('xml/getGachaSchedule.xml');

};

export const getRankUpData: EPR = async (info, data, send) => {

  send.xmlFile('xml/getRankUpData.xml');

};

export const getRanking: EPR = async (info, data, send) => {

  send.xmlFile('xml/getRanking.xml');

};

export const dataLoad: EPR = async (info, data, send) => {

  send.xmlFile('xml/dataLoad.xml');

};

