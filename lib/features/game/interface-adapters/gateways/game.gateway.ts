import Game from 'lib/features/game/core/entities/game.class';
import Player from 'lib/features/game/core/entities/player.class';

abstract class GameGateway {
    async getGame(gameId: string): Promise<Game> {
        // This should be implemented in a subclass
        throw new Error('Not implemented');
    }

    // return created Game._id
    async createGame(): Promise<Game> {
        throw new Error('Not implemented');
    }

    async updateGame({ players }: { players: Array<Player> }): Promise<Game | void> {
        throw new Error('Not implemented');
    }

    async deleteGame(gameId): Promise<void> {
        throw new Error('Not implemented');
    }
}

export default GameGateway;
