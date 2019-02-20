const mongoose = require('mongoose');
const config = require('./config');
const connectionString = config.db;
mongoose.set('useFindAndModify', false);

mongoose.connect(connectionString, { useNewUrlParser: true , useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we\'re connected!');
});

module.exports = mongoose;
