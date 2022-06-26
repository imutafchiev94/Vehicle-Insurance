require('dotenv').config();
const mongoose = require('mongoose');

module.exports = (app) => {

    if(process.env.NODE_ENV === 'test') {
        const Mockgoose = require('mockgoose').Mockgoose;
        const mockgoose = new Mockgoose(mongoose);

        mockgoose.prepareStorage()
        .then(() => {
            mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
            const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
        console.log("Mock Database connected");
    });
        })
    } else {

        mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
    
        const db = mongoose.connection;
    
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log("Database connected");
        });
    }
}