
import logger from '../../logger';
import mongoose from 'mongoose';


class MongooseConnection {
    private static instance: MongooseConnection;
    //   private constructor() {}

    public static getInstance(): MongooseConnection {
        if (!MongooseConnection.instance) {
            MongooseConnection.instance = new MongooseConnection();
        }
        return MongooseConnection.instance;
    }

    public async connect(): Promise<void> {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH,
        } = process.env;
        const mongoUri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`;

        try {
            mongoose.connect(mongoUri);
            logger.info('Successfully connected to the database');
        } catch (error) {
            logger.error('Error connecting to the database', error);
            process.exit(1); // Exit the process with failure
        }
    }
}

export default MongooseConnection;
