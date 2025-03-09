import 'dotenv/config';
import App from './app';
// import ItemController from './contollers/item.controller';
// import ListController from './contollers/list.controller';
// import UserController from './contollers/user.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
  [
    // new ListController(),
    // new ItemController(),
    // new UserController(),
  ],
  process.env.PORT,
);

app.listen();
