import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

class SocketService {
  private io: Server<DefaultEventsMap, DefaultEventsMap>;

  constructor(server: unknown) {
    this.io = new Server(server);
    this.initialize();
  }

  private initialize(): void {
    this.io.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
      console.log('New client connected');
      
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  public get getIO(): Server<DefaultEventsMap, DefaultEventsMap> {
    return this.io;
  }
}

export default SocketService;
