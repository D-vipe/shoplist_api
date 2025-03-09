import Game from "../core/entities/game.class";
import Fractions from "../core/enums/fractions";

function checkGameOverUseCase({ game } : {game: Game}): Fractions | null {
    const mafiaAlive: number = game.players.filter(player => player.isMafia && player.alive).length;
    const townAlive: number = game.players.filter(player => !player.isMafia && player.alive).length;

    if (mafiaAlive === 0) {
      // Мирные победили
      return Fractions.RED;
    } else if (mafiaAlive >= townAlive) {
      // Мафия победила
      return Fractions.BLACK;
    } else {
      return null; // Игра продолжается
    }
  }

  export default checkGameOverUseCase;
