const passport = require('passport');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const users = require('../models/users');
const {keys: {password : secret}} = require('../config');
const {generate_token, hash_input, send_response} = require('../util')

const findUser =({field, value})=>{
     return new Promise( async (resolve, reject)=>{
        await users.findOne({[field]: value}).exec((err,user)=>{
            if (err) return reject(err)
            resolve(user)
        })
     })
     
}
const actions = {
/* 
 *  sign up action
 */
 sign_up : async (req, res, next)=>{
      
    let jwt_token, {username, password, firstname, lastname, email} = req.body;
    
    //  check if email already exist
    let userExists = !! await findUser({field:'email', value: email})
    if (userExists) send_response(res,{status:'failed',message:'Username already taken.. try out another one',stat_code: 400, data: ''});
   

    //  generate random salt round
     const salt = Math.floor(Math.random() * 10);
      hash_input(password)
      .then(hash=>{
        users.create({
            username,
            password : hash,
            firstname,
            lastname,
            email,
       })
       .then( async ({username,password,email,_id})=>{
          //  generate jwt
              req.jwt_token = await generate_token({data: {username,password,email}, secret});
              req.id = _id;
              next()
          })
       .catch(err=>{
           if(err.code === 11000) send_response(res,{status:'failed',message:'Username already taken.. try out another one',stat_code: 400, data: ''});
       })
      })
      .catch(err=>{
         req.jwt_token = false;
         next()
      });
    
     
},

/* 
 *  login action
 */
login: async(req,res,next)=>{
   let {username, password, email} = req.body, user, jwt_token;
   console.log(req.body)
   //    find user
   user = await findUser({field: 'username', value: username})
   console.log(user)
   if (!user) return send_response(res,{status:'failed',message:'Username or password is incorrect',stat_code: 404, data: ''});
   const {password: hashed_password} = user;

   bcrypt.compare(password, hashed_password, ( err,same)=>{
       if(err) return res.status(401).json({message: "Username or password is incorrect"})
       JWT.sign({username,password,email}, secret, {expiresIn: 60*30},(err,token)=>{
         if(err) jwt_token= false;
         jwt_token = token;
                req.jwt_token = jwt_token;
                req.id = user._id;
                next()
       })
   })
}
}

module.exports = actions;