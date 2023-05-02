const {Router} = require("express")
const {getipdata,getIp} = require("../controller/findip.controller")
const {authontication} = require("../middleware/authoncation.middleware")

const findIp = Router()

findIp.get("/getipdata",getipdata)
findIp.get("/getIp",getIp)

module.exports ={findIp}