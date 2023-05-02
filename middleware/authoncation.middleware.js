

const redisClient  = require("../helpers/redis")

const  jwt =  require("jsonwebtoken")
require('dotenv').config()



const authontication  = async(req,res,next) => {

    try{
        const token = req.headers?.authorization?.split(" ")[1]
        if(!token){
            return res.status(401).send({message:"Authorization token missing.."})
        }
        const isTokenValid = await jwt.verify(token,process.env.JWT_Sec)

        if(!isTokenValid){
            return res.status(401).send({message:"Authenticationn failed, please login again"})
        } 

        const isTokenBlacklisted = await redisClient.get(token)
        if(isTokenBlacklisted){
            return res.status(403).send({message:"Unauthorized"})
        } 

        req.body.userId = isTokenValid.userId;
        req.body.city = isTokenValid.city

        next()
    } catch(err){
        res.send(err.message);
    }
}
module.exports = {authontication}
