const express = require('express');
const Router = express.Router();
const {homepage:home_action} = require('../actions/blog');

Router.get('/', home_action, (req,res,next)=>{
    res.render('home', {layout: 'default', data: req.response_data})
})
Router.get('/category', (req,res,next)=>{
    res.render('category', {layout: 'default'})
})
Router.get('/contact', (req,res,next)=>{
    res.render('contact', {layout: 'default'})
})
Router.get('/about', (req,res,next)=>{
    res.render('about', {layout: 'default'})
})
Router.get('/article', (req,res,next)=>{
    res.render('article', {layout: 'default'})
})

module.exports = Router;