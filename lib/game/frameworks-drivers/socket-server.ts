import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import gameController from '../interface-adapters/controllers/game.controller';

module.exports = function(server) {
  const io: Server<DefaultEventsMap, DefaultEventsMap> = new Server(server);

  io.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
    console.log('New client connected');

    // Initialize the game controller
    const initializeGameController = gameController(io);
    initializeGameController(socket);

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};
