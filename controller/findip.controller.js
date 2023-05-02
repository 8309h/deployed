const axios =  require("axios")
const {redisClient} = require("../helpers/redis")
const ipAddress = require("../model/findip.model")
const { setCache, getCache } = require('../utils/cacheUtils');
const user = require("../model/user.model");
const jwt = require("jsonwebtoken")
const logger = require("../middleware/logger")
const ipAddressmid = require("../middleware/ipaddress")
const API_KEY = process.env.API_KEY

const getipData = async(ip)=>{
    try{
        const response = await axios.get(`https://ipapi.co/${ip}/json/?key=${process.env.API_KEY}`)

        return{
            city:response.data.city,
            region:response.data.region,
            country:response.data.country,
            timezone:response.data.timezone
        }
        
    }catch(err){
        return res.status(500).send(err.message)
    }
}

const getIp = async(req,res)=>{
    const {ip} = req.params;
    const token = req.headers.authorization.split(' ')[1];

    const decode = jwt.verify(token,process.env.JWT_Sec)

    try{
      const cache = await getCache(ip)
      if(cache){
        logger.info(`${ip} from Redis cache`)
      }

      const ipInfo = await getipData(ip)
      await setCache(ip,ipInfo)
      const search = new Search({
        user: decodedToken.userId,
        ip,
        ...ipInfo
      });
      await search.save();
  
    } catch(err){
        res.status(403).send({msg:err.message})
    }
}

module.exports = {getipData,getIp}