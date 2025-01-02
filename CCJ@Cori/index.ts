import { pcbBoot, getRankUpData, getGachaSchedule, getRanking, dataLoad} from './handlers/hardcode';

export function register() {
 
  R.GameCode('UJK');
  
  R.Contributor('Max');
  R.Contributor('OLEG');
  R.Contributor('wrshooter');

  R.Route('system.pcbBoot', pcbBoot);
  R.Route('system.dataLoad', dataLoad);
  R.Route('game.getRankUpData', getRankUpData);
  R.Route('system.getGachaSchedule', getGachaSchedule);
  R.Route('player.getRanking', getRanking);

  R.Unhandled();

  console.log('Plugin Registered');

  console.log(`Core Version: v${CORE_VERSION_MAJOR}.${CORE_VERSION_MINOR}`);
}
