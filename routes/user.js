const user = require("../models/user.js");
const { verifyToken } = require("./verifyToken.js");
const { verifyTokenAndAuthorization } = require("./verifyToken.js");
const router =require("express").Router();

//updating user data with put method and jwt
router.put("/:id", verifyTokenAndAuthorization, async (req, res)=>{
     if(req.body.password){
          req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_PSW).toString();
     }

     try{
          const updatedUser = await user.findByIdAndUpdate(req.params.id, {
               $set: req.body
          },{new: true});
          res.status(200).json(updatedUser);
     }catch(err){
          res.status(500).json(err);
     }
} );

module.exports = router;