const expressJwt = require("express-jwt");//This library is normally used to secure the API's in our server

/*here we will check if the user is been logined via this 
secret token string if not then API will not work */
const secret = process.env.SECRET_JWT;
//using regular expressions
function authJwt(){
    return expressJwt({
        secret,
        isRevoked:isRevoked, // revoking the token
        algorithms:['HS256'],
    }).unless({
        path:[ //excluding some urls such that they don not required jwt verification token to transmitt request for getting some data
            {url:"/api/v1/users/login",method:['POST','OPTIONS']},
            {url:"/api/v1/users/register",method:['POST','OPTIONS']},
            {url:/\/api\/v1\/products(.*)/,method:['GET','OPTIONS']},
            {url:/\/api\/v1\/categories(.*)/,method:['GET','OPTIONS']},
        ]
    })
}
module.exports = authJwt;

//for admin permission 
async function isRevoked(req,payload,done){
    if(!payload.isAdmin){
        done(null,true);//if u r not admin then reject the token
    }
    done();//else accept the token and give access.
}
// function authJwt(){
//     return expressJwt({
//         secret,
//         algorithms:['HS256'],
//     }).unless({
//         path:[ //excluding some urls such that they don not required jwt verification token to transmitt request for getting some data
//             {url:"/api/v1/users/login",method:['POST','OPTIONS']},
//             {url:"/api/v1/users/register",method:['POST','OPTIONS']},
//             {url:"/api/v1/products/",method:['GET','OPTIONS']},
//         ]
//     })
// }