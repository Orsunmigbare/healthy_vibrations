const mongoose = require('mongoose');
const config = require('./config');
const config_local = config['development']
const {v2: cloudinary} = require('cloudinary');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '..', '.env')})
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET 

});
console.log(process.env.CLOUD_NAME)
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


