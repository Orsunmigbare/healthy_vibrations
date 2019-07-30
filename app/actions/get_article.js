const  {verify_token, convert_string_to_array, get_landing_and_images, send_response} = require('../util');
const articles = require('../models/artilces');

const actions = {
    get_articles_list: (req,res,next)=>{
        let status = verify_token(req,res);
        if(!status.status) return;
        let message = {}, {writer_id} = req.params;
        articles.find({writer: writer_id},(err,articles)=>{
            if(err) {
                message.status = 'failed';
               return send_response(res,{...message ,message:'Could not get articles, please try again',stat_code: 404, data: ''});
            }
            console.log(articles)
            console.log('article found here')
            message.data = articles.map(article=>({title: article.title, id:article._id, category: article.category, sub_category: article.sub_category}));
            message.status = 'success';
            message.message = "Retrieved data succesfully"
            req.message = message;
            next();
        }); 
    },
    get_article: (fields)=>{
        return (req,res,next)=>{
            let status = verify_token(req,res);
            if(!status.status) return;
            let message={ message: {}}, {article_id} = req.params;
            articles.findById(article_id,(err , article)=>{
                  if(err){
                      console.log(err)
                      message.message = 'could not get articles, please try again';
                      message.status = 'failed';
                     return send_response(res,{...message, stat_code: 404, data: ''});
                  }
                  
              fields.forEach(field=>{
                  message.data[field] = article[field]
              })
              message.status = 'success';
              req.message = message;
              next()
            })
        }
      
    },
    deleteArticle: (req,res,next)=>{
        verify_token(req,res);
       let {article_id} = req.params, message={};
       articles.findByIdAndDelete(article_id,(err,details)=>{
           if(err){
                message.message = 'An error occured while deleting article, please try again';
                message.status = 'failed';
                return res.status(404).json(message)
           }
           message.message = 'Article deleted successfully';
           message.status = 'failed';
           req.message =  message;
           next()
       })
    }
    
}

module.exports = actions;