/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import log4js from 'log4js';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
// import uuid from 'uuid';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';

const apiRouter = require("./routers/main.router.mjs");
// const userRouter = require("./routers/user.router");

dotenv.config();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Robot_Dreams Admin Panel Api',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. For Robot_Dreams Task',
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
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [path.join(__dirname, '/routers/*.js')],
};
const swaggerSpec = swaggerJSDoc(options);

const corsOptions = {
  origin: "http://localhost:" + process.env.PORT,
};


const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;


const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));
// app.use(express.static(__dirname + "/assets"));

app.use("/api", apiRouter);
// app.use("/api/users", userRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (request, response) => {
  response.send('Hello world!');
});

app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));
