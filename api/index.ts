import 'dotenv/config';
import App from './app';
import MainController from './contollers/main.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
  [
    new MainController(),
  ],
  process.env.PORT,
);

app.listen();
