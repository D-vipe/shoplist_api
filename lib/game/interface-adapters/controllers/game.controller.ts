import { Server, Socket } from 'socket.io';
import gamePresenter from '../presenters/game.presenter';
import startGameUseCase from 'lib/game/use-cases/start-game.use-case';
import mafiaTargetUseCase from 'lib/game/use-cases/mafia-target.use-case';
// import startGameUseCase from '../use-cases/start-game.use-case';
// import mafiaTargetUseCase from '../use-cases/mafia-target.use-case';

import logger from 'lib/logger';
import GeneralGameEvents from 'lib/game/core/enums/general-game-events';
import PlayerGameEvents from 'lib/game/core/enums/player-game-events';

class GameController {
  constructor(private io: Server) { }

  public initialize(socket: Socket): void {
    socket.on(GeneralGameEvents.START, this.startGame.bind(this, socket));
    socket.on(GeneralGameEvents.MAFIA_TARGET, this.mafiaTarget.bind(this, socket));
  }

  private async startGame(socket: Socket): Promise<void> {
    try {
      const gameId = socket.id;
      const game = await startGameUseCase({ gameId });

      this.io.to(gameId).emit(GeneralGameEvents.GAME_STATE, gamePresenter.presentGameState(game));

      game.players.forEach(player => {
        socket.to(player._id).emit(PlayerGameEvents.ROLE, player.role);
      });
      logger.info('Game started successfully', { gameId });
    } catch (error) {
      logger.error('Error starting game', { error });
      socket.emit(GeneralGameEvents.ERROR, 'Failed to start game');
    }
  }

  private async mafiaTarget(socket: Socket, targetName: string): Promise<void> {
    try {
      const gameId = socket.id;
      const game = await mafiaTargetUseCase({ gameId, targetName });

      this.io.to(gameId).emit(GeneralGameEvents.GAME_STATE, gamePresenter.presentGameState(game));
    } catch (error) {
      logger.error('Error processing mafia target', { error });
      socket.emit(GeneralGameEvents.ERROR, 'Failed to process mafia target');
    }
  }
}

export default (io: Server) => {
  const gameController = new GameController(io);
  return (socket: Socket) => gameController.initialize(socket);
};
