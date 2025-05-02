import userModel from 'lib/features/user/infrastructure/models/user.model';

const updateUserSchema = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_PATH, {
        //     user: process.env.MONGO_USER,
        //     pass: process.env.MONGO_PASSWORD,
        // });

        // console.log('Connected to MongoDB');

        // Example: Add default values for new fields
        await userModel.updateMany(
            { createdAt: { $exists: false } }, // Check if the field is missing
            { $set: { createdAt: new Date(), updatedAt: new Date() } } // Set default values
        );

        await userModel.updateMany(
            { nickname: { $exists: false } },
            { $set: { nickname: '' } }
        );

        console.log('Schema update completed');
        // mongoose.disconnect();
    } catch (error) {
        console.error('Error updating schema:', error);
        // mongoose.disconnect();
    }
};

export default updateUserSchema;
