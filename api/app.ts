import express from 'express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import errorMiddleware from './middleware/error.middleware';
class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
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
