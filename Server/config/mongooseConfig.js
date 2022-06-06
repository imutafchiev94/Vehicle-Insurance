require('dotenv').config();
const mongoose = require('mongoose');

module.exports = (app) => {
    mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Database connected");
    });
}