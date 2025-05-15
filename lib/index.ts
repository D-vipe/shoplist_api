import 'reflect-metadata'; // Required for inversify
import 'dotenv/config';
import App from './app';
import validateEnv from './utils/validateEnv';
import container from './container';
import UserController from './features/user/interface-adapters/controllers/user.controller';

validateEnv();

// Resolve controllers from the container
const userController = container.get(UserController);

const app = new App(
  [
    userController,
  ],
  process.env.PORT,
);

app.listen();

export default app;
