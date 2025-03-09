
import Game from '../core/entities/game.class';
import gameStore from '../interface-adapters/gateways';
import assignRolesUseCase from './assign-roles.use-case';

const startGameUseCase = async ({ gameId }: { gameId: string }): Promise<Game> => {
  const game: Game = await gameStore.getGame(gameId) ?? await gameStore.createGame();
  const players = game.players;
  const assignedPlayers = assignRolesUseCase(
    { players: players, roles: game.roles });

  const updatedGame = await gameStore.updateGame({ gameId: gameId, players: assignedPlayers });

  if (!updatedGame) {
    throw new Error('Failed to update the game');
  }
  
  return updatedGame;
};

export default startGameUseCase;
