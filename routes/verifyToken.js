const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
     const authHeader = req.headers.token;
     if(authHeader){
          const token = authHeader.split(" ")[1];
          jwt.verify(token, process.env.JWT_KEY, (err, user)=>{
               if(err){
                    return res.status(403).json("invalid Token");
               };
               req.user = user;
               next();
          });
     }else{
          return res.status(401).json("not authenticated!");
     }
};

const verifyTokenAndAuthorization = (req, res, next)=>{
     verifyToken(req,res,()=>{
          if(req.user.id === req.params.id || req.user.isAdmin){
               next();
          }else{
               res.stauts(403),json("You are not allowed");
          }
     });
}

module.exports = {verifyToken, verifyTokenAndAuthorization};