import Game from "../core/entities/game.class";
import Player from "../core/entities/player.class";
import Phases from "../core/enums/phases";
import Roles from "../core/enums/roles";

const nightPhaseUseCase = ({ game, mafiaTarget, sheriffTarget, doctorTarget, mistressTarget, }: { game: Game, mafiaTarget?: string, sheriffTarget?: string, doctorTarget?: string, mistressTarget?: string, }): Game => {

  let killedThisNight: string | null = mafiaTarget;
  // Refactor this logic later
  const savedThisNight: string | null = doctorTarget ?? mistressTarget;
  let sheriffCheck: string | null;

  if (killedThisNight === savedThisNight) {
    killedThisNight = null;
  }

  let updatedPlayers: Array<Player> = game.players;

  if (killedThisNight !== null) {
    updatedPlayers = game.players.map(player => {
      if (player._id === killedThisNight) {
        return player.update({ alive: false });
      }
      return player;
    });

  }

  if (sheriffTarget) {
    const checkedPlayer = updatedPlayers.find(player => player._id === sheriffTarget);

    sheriffCheck = checkedPlayer.role === Roles.MAFIA || Roles.MAFIABOSS ? sheriffTarget : null;
  }


  return game.update({ players: updatedPlayers, votes: [], killedThisNight, savedThisNight, sheriffCheck, dayNightIndex: game.dayNightIndex + 1, phase: game.phase === Phases.NIGHT ? Phases.DAY : Phases.NIGHT });
};

export default nightPhaseUseCase;
