import 'dotenv/config';
import App from './app';
import validateEnv from './utils/validateEnv';
import UserController from './features/user/interface-adapters/controllers/user.controller';

validateEnv();

const app = new App(
  [
    new UserController(),
    // new GameCo
    // new ListController(),
    // new ItemController(),

  ],
  process.env.PORT,
);

app.listen();
