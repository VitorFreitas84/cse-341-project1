const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
    if (database) {
        console.log('DB is already initialized!');
        return callback(null, database);
    }

    console.log('MONGODB_URL:', process.env.MONGODB_URL); // Log the MONGODB_URL

    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client.db(); // Ensure it selects the database
            console.log("Database connected successfully!");
            callback(null, database);
        })
        .catch((err) => {
            console.error("Database connection failed!", err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initdb,
    getdatabase
};