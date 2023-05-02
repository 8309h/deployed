
const  {user} =  require ("../model/user.model")

const bcrypt =  require("bcrypt")
const jwt =  require("jsonwebtoken")
const  redisClient =  require("../helpers/redis")
require('dotenv').config()


const  signup =  async (req,res) => {
    try {
        const {name ,email,password,PreferedCity} =  req.body;


        const  Userpresent =  await user.findOne({email});

        if(Userpresent)  return res.send("User alredy exists Please Login")


        const hash  =  await bcrypt.hash(password,5);

        const newuser =  new user({name,email,password:hash,PreferedCity})

       await newuser.save();
       res.send ("Signup Success")
    }catch(err) {
        console.log(err)
        res.send(err.message)
    }
}

const  login =  async(req,res) => {

    try{

        const {email,password} =  req.body;

        const  Userpresent  =  await user.findOne({email})

        if(!Userpresent) return res.send("UserNot valid ,register Please")

        const ispassmatch =  await bcrypt.compare(password,Userpresent.password)

        if(!ispassmatch)  return res.send("Invalid Credentials")

        const  token =  await jwt.sign({userId: Userpresent.PreferedCity}, process.env.JWT_Sec, {expiresIn : "2hr"})

        res.send({mes: "Login Sucessfull",token})

    }catch(err) {
        console.log(err)
        res.send(err.message)
    }
}

// const  logout  =  async(req,res) => {

//     try {
//         const  token  =req.headers?.authorization

//         if(!token)  return res.status(403)

//         await redisClient.set(token,token);

//         res.send("Logout sucessful")
//     }catch(err) {
//         console.log(err)
//         res.send(err.message)
//     }
// }
const logout = async(req,res) =>{

    try{

        const token = req.headers?.authorization?.split(" ")[1];

        if(!token) return res.status(403);

        await redisClient.set(token,token);
        res.send("logout successful");


    }catch(err) {
        res.send(err.message)
    }
}
module.exports = {signup,login,logout}