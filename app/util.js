const JWT = require('jsonwebtoken');

module.exports = {
    strip_token : (tokenString)=>{
            console.log(tokenString.replace('token=',''))
            return tokenString.replace('token=','')
    },
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
    verify_token: ({token, secret})=>{
            let status = {};
            return new Promise((resolve,reject)=>{
                JWT.verify(token,secret, (err,verified)=>{
                    if (err) {status.status = false; status.message = err; reject(status)};
                    status.status = 'success'; 
                    status.message = 'verified';
                    resolve(status)
                })
            })
    }
}