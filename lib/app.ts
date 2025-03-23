import express from 'express';
import http from 'http';
import path from "path";
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import errorMiddleware from './common/middleware/error.middleware';
import MongooseConnection from './common/database/mongoose-connection';
import SocketService from './frameworks-drivers/socket-service';
import { DefaultEventsMap, Server } from 'socket.io';


class App {
  public app: express.Application;
  public port: number;
  private server: http.Server;
  private SocketService: SocketService | null;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.initSocketService();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });

  }

  private initializeSwagger() {
    const swaggerDefinition = {
      openapi: '3.0.0',
      info: {
        title: 'MAFIA Admin Panel API',
        version: '1.0.0',
        description:
          'REST API for MAFIA Admin Panel',
        license: {
          name: 'Licensed Under MIT',
          url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
          name: 'D-vipe',
        },
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT ?? 3000}`,
          description: 'Development server',
        },
      ],
    };
    const options = {
      swaggerDefinition,
      // Paths to files containing OpenAPI definitions
      apis: [path.join(__dirname, '/swagger/*.js')],
    };
    const swaggerSpec = swaggerJSDoc(options);

    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  private connectToTheDatabase() {
    const mongooseConnection = MongooseConnection.getInstance();
    mongooseConnection.connect();
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initSocketService() {
    this.SocketService = new SocketService(this.server);
  }

  public get getIO(): Server<DefaultEventsMap, DefaultEventsMap> {
    if (this.SocketService != null) {
      return this.SocketService.getIO;
    } else {
      this.initSocketService();
      return this.SocketService.getIO;
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
