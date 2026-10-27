
import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};

export default dbConnect;
