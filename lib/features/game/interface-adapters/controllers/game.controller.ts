import * as express from 'express';
import { Socket } from 'socket.io';
import gamePresenter from '../presenters/game.presenter';
import startGameUseCase from 'lib/features/game/use-cases/start-game.use-case';
import mafiaTargetUseCase from 'lib/features/game/use-cases/mafia-target.use-case';
// import startGameUseCase from '../use-cases/start-game.use-case';
// import mafiaTargetUseCase from '../use-cases/mafia-target.use-case';

import logger from 'lib/logger';
import GeneralGameEvents from 'lib/features/game/core/enums/general-game-events';
import PlayerGameEvents from 'lib/features/game/core/enums/player-game-events';
import app from 'lib';
class GameController {
  public router = express.Router();
  private _baseUrl = '/games';

  constructor() {
    this.intializeRoutes();
   }


   private intializeRoutes() {
    this.router.get(`${this._baseUrl}/init`, this.initGameSocket);
    // this.router.put('/users', validationMiddleware(UserDto), this.createUser);
    // this.router.post(`/users/login`, validationMiddleware(UserLoginDto), this.login);
    // this.router.post(`${this.path}/logout`, this.loggingOut);
    // this.router.get(`/users/getById`, authMiddleware, this.getById);
    // this.router.patch(`${this.path}/update`, authMiddleware, validationMiddleware(UserDto, true), this.update);
  }

  private initGameSocket(socket: Socket): void {
    socket.on(GeneralGameEvents.START, this.startGame.bind(this, socket));
    socket.on(GeneralGameEvents.MAFIA_TARGET, this.mafiaTarget.bind(this, socket));
  }

  private async startGame(socket: Socket): Promise<void> {
    try {
      const gameId = socket.id;
      const game = await startGameUseCase({ gameId });

      app.getIO.to(gameId).emit(GeneralGameEvents.GAME_STATE, gamePresenter.presentGameState(game));

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

      app.getIO.to(gameId).emit(GeneralGameEvents.GAME_STATE, gamePresenter.presentGameState(game));
    } catch (error) {
      logger.error('Error processing mafia target', { error });
      socket.emit(GeneralGameEvents.ERROR, 'Failed to process mafia target');
    }
  }
}

export default GameController;
