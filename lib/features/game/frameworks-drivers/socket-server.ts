import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import gameController from '../interface-adapters/controllers/game.controller';

class SocketServer {
  private io: Server<DefaultEventsMap, DefaultEventsMap>;

  constructor(server: unknown) {
    this.io = new Server(server);
    this.initialize();
  }

  private initialize(): void {
    this.io.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
      console.log('New client connected');

      // Initialize the game controller
      const initializeGameController = gameController(this.io);
      initializeGameController(socket);

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  public getIO(): Server<DefaultEventsMap, DefaultEventsMap> {
    return this.io;
  }
}

export default SocketServer;
