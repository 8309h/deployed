
const {Router}  = require("express")
const {signup,login,logout}=  require("../controller/user.controller")
const {authontication} =  require("../middleware/authoncation.middleware")

const UserRouter =  Router();

UserRouter.post("/signup",signup)
UserRouter.post("/login",login)
UserRouter.get("/logout",authontication,logout);


module.exports  = {UserRouter}



