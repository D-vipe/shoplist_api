import express from 'express';
import path from "path";
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import errorMiddleware from './middleware/error.middleware';


class App {
  public app: express.Application;
  public port: number;

  constructor(controllers,  port) {
    this.app = express();
    this.port = port;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeSwagger();
    this.initializeErrorHandling();
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
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;

    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log("DB connected.");
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
