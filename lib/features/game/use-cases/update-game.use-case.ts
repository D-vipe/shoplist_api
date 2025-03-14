import Game from "../core/entities/game.class";
import Player from "../core/entities/player.class";

function updateGameUseCase({ game, players, }: { game: Game, players: Array<Player> }): Game {

    if (expelledPlayerId && !isTie) {
      updatedPlayers  = game.players.map(player => {
        if (player._id === expelledPlayerId) {
          return player.update({ alive: false });
        }
        return player;
      });
    }


    return game.update({ players: updatedPlayers, votes: [], phase: Phases.DAY });
  }

  export default updateGameUseCase;
