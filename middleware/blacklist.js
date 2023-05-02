
const express = require("express")
const jwt = require("jsonwebtoken")
const redisClient = require("../helpers/redis")

const checkBlacklist = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    const result = await redisClient.get(token);
    if (result) {
      logger.info('Token is blacklisted');
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    next();
  };
  
  module.exports = {
    checkBlacklist
  };
  