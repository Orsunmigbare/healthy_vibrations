const express = require('express');
const routes = require('./routes')
const app = express();
const path = require('path')

app.use(express.static(path.join(__dirname,'..' ,'public')));

app.use('/',routes)
app.listen(3000, ()=>{
    console.log('Server started at port 3000')
})