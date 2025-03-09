import gameStore from '../interface-adapters/gateways';
import nightPhaseUseCase from './night-phase.use-case';

const mafiaTargetUseCase = async ({ gameId, targetName }: { gameId: string, targetName: string }) => {
    const game = await gameStore.getGame(gameId);

    if (!game) {
        throw new Error('Game not found');
    }
    const updatedGame = nightPhaseUseCase({
        game: game,
        mafiaTarget: targetName,
        sheriffTarget: null,
        doctorTarget: null,
        mistressTarget: null,
    });

    await gameStore.updateGame({ gameId, players: updatedGame.players });
    return updatedGame;
};

export default mafiaTargetUseCase;
