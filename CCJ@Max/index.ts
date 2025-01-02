import { pcbBoot, getRankUpData, getGachaSchedule, getRanking, dataLoad, bull} from './handlers/hardcode';
import { matchMake } from './handlers/matchmaking'
import { checkIn, checkOut, saveUserdata, saveResult, getUserData} from './handlers/player'
export function register() {
 
  R.GameCode('UJK');
  
  R.Contributor('Max');
  R.Contributor('OLEG');
  R.Contributor('wrshooter');
  R.Contributor('CORI');

  R.Route('system.pcbBoot', pcbBoot);
  R.Route('system.dataLoad', dataLoad);
  R.Route('game.getRankUpData', getRankUpData);
  R.Route('system.getGachaSchedule', getGachaSchedule);
  R.Route('player.getRanking', getRanking);
  R.Route('game.matchMake', matchMake);
  R.Route('game.saveResult', saveResult);
  R.Route('player.checkIn', checkIn);
  R.Route('player.checkOut', checkOut);
  R.Route('player.dataSave', saveUserdata);
  R.Route('player.dataLoad', getUserData);
  R.Unhandled();

  console.log('Plugin Registered');

  console.log(`Core Version: v${CORE_VERSION_MAJOR}.${CORE_VERSION_MINOR}`);
}
