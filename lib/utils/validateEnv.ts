/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    cleanEnv, str,
} from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
        MONGO_USER: str()
    });
}

export default validateEnv;
