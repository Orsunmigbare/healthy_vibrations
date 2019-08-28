const  {verify_token, convert_string_to_array, get_landing_and_images, send_response} = require('../util');
const articles = require('../models/artilces');
const multer = require('multer');
const cloudinary_storage = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary');


const actions = {
    // save article descsription
    save_description : async (req,res,next)=>{
        let status = verify_token(req,res);
        if(!status.status) return;
        let {category, sub_category, tags, title, writer_id} = req.body;
            console.log(tags)
            articles.create({category, sub_category, tags, title, writer: writer_id})
            .then(article=>{
               req.message = {status: 'success', message: "created article succesfully", stat_code: 200, data : {article_id : article._id}}
                next()
            })
            .catch(err=>{
              return  send_response(res,{status:'failed',message:'There was an error creating the article, please try again',stat_code: 400, data: ''});
            }) 
    },
    update_article_description : async (req,res,next)=>{
        let status = verify_token(req,res);
        if(!status.status) return;
        let {category, sub_category, tags, title, id} = req.body;
        articles.updateOne({_id : id}, {$set : {category, sub_category, tags, title}})
        .then(article=>{
            req.message = {status: 'success', message: "updated article succesfully", stat_code: 200}
            next()
        })
        .catch(err =>{
            return  send_response(res,{status:'failed',message:'There was an error updating the article, please try again',stat_code: 400, data: ''});
        })

    },
//    save article html
    save_content  : async (req,res,next)=>{
        let status = verify_token(req,res);
        if(!status.status) return;
        let {paragraphs, id} = req.body;
        console.log(id, 'article id')
        articles.updateOne({_id: id}, {$set : {paragraphs: convert_string_to_array(paragraphs)}}, {useFindAndModify: false})
        .then(article=>{
            req.message = {status: 'success', message: "saved article content succesfully"};
            console.log(article)
            next();
        })
        .catch(err=>{
           return send_response(res,{status:'failed',message:'There was an error updating the article, please try again',stat_code: 400, data: ''});
        })
        
    },
   
    // save image online
    image_parser :async (req,res,next)=>{
        let status = verify_token(req,res);
        if(!status.status) return;
        let message = {}
        const storage = cloudinary_storage({ cloudinary: cloudinary, folder: 'healthy_vibrations',transformation: [{ width: 500, height: 500, crop: "limit" }]})
        const parser = multer({storage: storage});
        parser.array('images',12)(req,res, async (err)=>{
            if(err instanceof multer.MulterError || err){
                console.log(err)
                message.status = 'failed';
                message.message = 'error saving image';
              return  send_response(res,{...message, stat_code: 400, data: ''});
            }else{
                message.status = 'success';
                message.message = 'image saved successfully'
                req.message = message;
                console.log(req.message)
                next();
            }
        });
        
    },
    // save image link to db
    save_image: (req,res,next)=>{
        let {id} = req.body, images = [];
        console.log(id)
        images = req.files.map(file=>({url: file.secure_url, name: file.originalname}));
        let imageObj =  get_landing_and_images(images)
        console.log(imageObj)
        articles.findOneAndUpdate({_id: id}, {$set : {
            landing_image : imageObj.landing,
            images : imageObj.others
        }},{useFindAndModify: false})
        .then(res=>{
            next();
        })
        .catch(err=>{
            let message = {};
            console.log(err)
            message.message = "an unknown error occured, please try again";
            message.status = 'error'
          return  send_response(res,{...message,stat_code: 500, data: ''});
        })
    }
}


module.exports = actions;