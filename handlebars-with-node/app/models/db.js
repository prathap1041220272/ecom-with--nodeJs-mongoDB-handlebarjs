'use strict';
const mongoose = require('mongoose');

async function connectToDB() {
    try {
        await mongoose.connect('mongodb://localhost/ecomTask', { useNewUrlParser: true });
        console.log('Succefully Connected To DB');
    } catch (error) {
        console.error('Database Connection Failed');
        process.exit(1);
    }
}
connectToDB();
const db = mongoose.connection;
module.exports = db;