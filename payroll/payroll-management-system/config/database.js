const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Make sure to use the MONGO_URI from your .env file
        const conn = await mongoose.connect(process.env.MONGO_URI, {
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
