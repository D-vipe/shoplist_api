import Game from "../core/entities/game.class";
import Player from "../core/entities/player.class";
import Vote from "../core/entities/votes.interface";
import Phases from "../core/enums/phases";

function votingPhaseUseCase({ game }: { game: Game }): Game {
  const voteCounts = {};

  for (let i = 0; i < game.votes.length; i++) {
    const vote: Vote = game.votes[i];

    voteCounts[vote.target] = (voteCounts[vote.target] || 0) + 1;
  }

  let mostVotes = 0;
  let expelledPlayerId: string | null = null;
  let isTie: boolean = false;

  for (const targetPlayerId in voteCounts) {
    if (voteCounts[targetPlayerId] > mostVotes) {
      mostVotes = voteCounts[targetPlayerId];
      expelledPlayerId = targetPlayerId;
      isTie = false;
    } else if (voteCounts[targetPlayerId] === mostVotes) {
      isTie = true; // Ничья!
    }
  }

  let updatedPlayers: Array<Player> = game.players;

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

export default votingPhaseUseCase;
