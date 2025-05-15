import Game from 'lib/features/game/core/entities/game.class';
import GameGateway from './game.gateway';
import Phases from 'lib/features/game/core/enums/phases';
import Player from 'lib/features/game/core/entities/player.class';

class InMemoryGameStore extends GameGateway {
    private games: Array<Game>;

    constructor() {
        super();
        this.games = [];
    }

    async getGame(gameId: string): Promise<Game> {
        return this.games.find(game => game._id === gameId);
    }

    async createGame(): Promise<Game> {
        const gameId = generateUniqueId(); // Функция для генерации уникального ID
        const game = new Game({ id: gameId, roles: [], players: [], phase: Phases.SETUP });
        this.games.push(game);
        return game;
    }

    async updateGame({ gameId, players }: { gameId: string, players: Array<Player> }): Promise<Game | void> {
        let game = this.games.find(game => game._id === gameId);
        if (game) {
            game = game.update({ players: players });
        }

        // TODO add saving to DB

        return game;
    }

    async deleteGame(gameId: string): Promise<void> {
        this.games = this.games.filter(game => game._id !== gameId);

        // TODO add deleting from DB

        return;
    }
}

export default InMemoryGameStore;

function generateUniqueId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
