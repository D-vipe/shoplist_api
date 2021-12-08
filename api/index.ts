import 'dotenv/config';
import App from './app';
import MainController from './contollers/main.controller';
import UserController from './contollers/user.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
  [
    new MainController(),
    new UserController(),
  ],
  process.env.PORT,
);

app.listen();
