const JWT = require('jsonwebtoken');
const {keys: {password : secret}} = require('./config');
const bcrypt = require('bcrypt');


const strip_token =  (tokenString)=>{
    return tokenString.replace('token=','')
}
module.exports = {
    generate_token: ({data,secret,exp})=>{
           let jwt;
           return new Promise((resolve,reject)=>{
            JWT.sign(data,secret, {expiresIn: exp || 60 * 30}, (err,token)=>{
                if(err){  jwt = false; reject(jwt)}
                jwt = token;
                resolve(jwt)
            })
           })
            
    },
    verify_token: (req,res)=>{
        let {cookie} = req.headers;
        console.log(cookie);
            let status = {};
            try{
                let jwt = strip_token(cookie);
                JWT.verify(jwt,secret)
                status.status = 'success'; 
                status.message = 'verified';
                return status;
            }catch(err){
                 console.log(err);
                 status.status = false; 
                 status.code = 403;
                 status.message = 'invalid json web token'; 
                 return res.status(403).json({...status});
                //  return status
            }
        
           
           
    },
    hash_input : (password)=>{
        const salt = Math.floor(Math.random() * 10);
        return  bcrypt.hash(password, salt)
    },
    convert_string_to_array: (paragraphs)=>{
        paragraphs = paragraphs.split('<p>'); let sanitized = [];
        paragraphs.forEach((p,i)=>{
            if(!p) return;
            let newP = p.replace("</p>", "")
         sanitized.push(newP)
          });
          return sanitized
    },
    get_landing_and_images: (images)=>{
        let landing, others=[];
       landing =  images.findIndex(image=>(image.name.split('.')[0] === 'main'));
       if(landing > -1){
           landing = images[landing].url;
            images.splice(landing, 1)
            others = images.map(image=>(image.url))
       }else{
           landing = images[0].url;
           images.splice(0, 1)
           others = images.map(image=>(image.url))
       }
       return {landing,others}
        
    },
    send_response: (res, {status,message,stat_code,data})=>{
        stat_code = stat_code || 200
                    return res.status(stat_code).json({status, message, data})
    }
}