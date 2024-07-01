import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongodbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Mongodb is connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default mongodbConnect;
