let express = require('express');
let Router = express.Router();
let authAction = require('../actions/auth');
let createAction = require('../actions/create_article');


Router.post('/signup',  authAction.sign_up,  (req,res)=>{
         res.json({
             jwt_token: req.jwt_token
         })
})

Router.post('/login', authAction.login, (req,res)=>{
        res.json({
            jwt_token: req.jwt_token
        })
})

Router.post('/save_article_description', createAction.save_description, (req,res)=>{
          
})

module.exports = Router;