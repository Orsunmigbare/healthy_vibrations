const {keys: {password : secret}} = require('../config');
const  {strip_token,verify_token} = require('../util');
const articles = require('../models/artilces');


const actions = {
    // save article descsription
    save_description : async (req,res,next)=>{
        let {cookie} = req.headers;
        let jwt = strip_token(cookie);
        let token = await verify_token({token: jwt, secret})
        if(!token) res.status(403).json(token);
        let {category, sub_category, tags, title} = req.body;
        articles.create({category, sub_category, tags : JSON.parse(tags),title})
        .then(article=>{
            res.json({status: 'success', message: "created article succesfully", article_id : article._id})
        })
        .catch(err=>{
            res.status(400).json({status: 'error', message: "there was an error creating article, please try again"})
        })
    }
}


module.exports = actions;