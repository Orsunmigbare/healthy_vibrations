let express = require('express');
let Router = express.Router();
let authAction = require('../actions/auth');
let createAction = require('../actions/create_article');
let getAction = require('../actions/get_article');
let {send_response} = require('../util');
Router.post('/signup',  authAction.sign_up,  (req,res)=>{
         res.cookie('token', req.jwt_token).json({
            staus: 'success',
            message: 'sign_up successful',
            data: {
                user_id: req.id
            }

        })
})

Router.post('/login', authAction.login, (req,res)=>{
        res.cookie('token', req.jwt_token).json({
            staus: 'success',
            message: 'login successful',
            data: {
                user_id: req.id
            }
        })
})



// post actions
Router.post('/save_article_description', createAction.save_description, (req,res)=>{
    send_response(res,{...req.message});
})

Router.post('/save_article_content', createAction.save_content, (req,res)=>{
     send_response(res,{...req.message});
})

Router.post('/save_article_images', createAction.image_parser, createAction.save_image, (req,res,next)=>{
    send_response(res,{...req.message});
})

Router.post('/update_article_description', createAction.update_article_description, (req,res)=>{
    send_response(res,{...req.message});
})


// get actions

Router.get('/get_articles_list/:writer_id', getAction.get_articles_list, (req,res,next)=>{
    send_response(res,{...req.message});
})
Router.get('/get_article/:article_id', getAction.get_article(), (req,res,next)=>{
    send_response(res,{...req.message});
})
Router.get('/get_article_description/:article_id', getAction.get_article(['category','sub_category','tags','title']), (req,res,next)=>{
    send_response(res,{...req.message});
})

Router.get('/get_article_content/:article_id', getAction.get_article(['paragraphs']), (req,res,next)=>{
    send_response(res,{...req.message});
})
Router.get('/get_article_images/:article_id', getAction.get_article(['images']), (req,res,next)=>{
    send_response(res,{...req.message});
})

Router.get('/delete_article/:article_id', getAction.deleteArticle, (req,res,next)=>{
    send_response(res,{...req.message});
})


module.exports = Router;