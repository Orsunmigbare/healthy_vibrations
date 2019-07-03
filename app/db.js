const mongoose = require('mongoose');
const config = require('./config');
const config_local = config['development']

const connect = ()=>{
    const db = mongoose.connection;
    mongoose.connect(
        config_local.database.connection_string,
        {useNewUrlParser: true,  useCreateIndex: true}
    )
    db.once('open', ()=>{console.log("connected to the database")});
    db.on('error', ()=>{console.log('error connecting to the database')});
}

module.exports = connect;


