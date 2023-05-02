const  express =  require("express")
const {connection}  = require("./config/db")
const { contentSecurityPolicy } = require("helmet")
const {UserRouter} =  require("./routes/user.routes")
const {findip} =  require("./routes/findip.route")
require('dotenv').config()






const app =  express()
app.use(express.json())


app.get("/", (req,res) => {
    res.send("IP info app")
})


app.use("/api/user",UserRouter)

app.use("/api/ip",findip)

app.listen(process.env.Port,async() => {

    try{
        await connection();
        console.log("connected to db")
        logger.log("info","connected")
       } catch(err) {
         console.log(err.message)
         logger.log("error","connection fail")
       }
    console.log("Server runnnig on port 4500")
})