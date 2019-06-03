const express = require('express');
const routes = require('./routes')
const app = express();
const path = require('path')
const port = process.env.PORT || 3000
app.use(express.static(path.join(__dirname,'..' ,'public')));

app.use('/',routes)
app.set('port', port);
app.listen(3000, ()=>{
    console.log(`Server started at port ${port}`)
})