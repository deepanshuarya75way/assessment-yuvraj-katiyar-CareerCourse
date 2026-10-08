const jwt = require ("jsonwebtoken")
const user = require("../models/User")

const authMiddleware = async(req,res,next)=> {
  const authHeader = req.headers.authorization


if(!authHeader){
  return res.status(401).json({
    message:"Authentication required"
  })
}

const token = authHeader.startsWith("Bearer")
? authHeader.split("")[1]
:null

if(!token){
  return res.status(401).json({
    message: "Invalid token"
  })
}

let decoded;
try{
  decoded = jwt.verify(token,process.env.JWT_SECRET);
}catch{
  return res.status(401).json({
    message :"Invalid or expired token",
  });
}

const user = await User.findById(decoded.id).select("activeSessionId");

if(!user){
  return res.status(401).json({
    message : "Invalid or expired Token",
  })
}

if(!decoded.sessionId || user.activeSessionId !== decoded.sessionId){
  return res.status(401).json({
    code:"SESSION_TAKEN_OVER",
    message: "Your Session was taken over by another device"
  })
}

req.user = decoded;
next();
}

module.exports = authMiddleware;