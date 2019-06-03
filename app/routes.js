const express = require('express');
const path = require('path')
app = express()
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.sendFile(path.join(__dirname, '..' ,'public', 'index.html'))
})

module.exports = router