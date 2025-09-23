const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
    if (database) {
        console.log('✅ Database is already initialized');
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            // ✅ This uses the DB name already included in the URI
            database = client.db(); 
            console.log('✅ MongoDB connected');
            callback(null, database);
        })
        .catch((err) => {
            console.error('❌ MongoDB connection error:', err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('❌ Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};