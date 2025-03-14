const gamePresenter = {
  presentGameState: (game) => {
    // Создаем копию состояния игры, чтобы не менять оригинал
    const presentedGame = { ...game };
    // Скрываем роли игроков для всех, кроме тех, кому они должны быть известны
    presentedGame.players = game.players.map(player => ({
      id: player.id,
      name: player.name,
      alive: player.alive,
      // Не отправляем роль всем игрокам, можно добавить логику для мафии/шерифа
    }));
    return presentedGame;
  }
};

export default gamePresenter;
