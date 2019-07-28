const express = require('express');
const main_route = require('./routes/main_route');
const api_route = require('./routes/api')
const body_parser = require('body-parser')
const cors = require('cors');
// const cookie_parser = require('cookie-parser');
const app = express();
const path = require('path');
const db = require('./db');
const port = process.env.PORT || 3000
app.use(express.static(path.join(__dirname, '..', 'public')));
/* connect to db */
db();


app.use(cors({ credentials: true, origin: 'http://localhost:3001'}))
// app.use(cookie_parser());
app.use(body_parser.urlencoded({
    extended: false
 }));
 app.use(body_parser.json());

 
// routes
app.use('/', main_route)
app.use('/api', api_route)



app.set('port', port);
app.listen(3000, () => {
    console.log(`Server started at port ${port}`)
})