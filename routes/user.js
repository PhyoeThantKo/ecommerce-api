const user = require("../models/user.js");
const { verifyToken } = require("./verifyToken.js");
const { verifyTokenAndAuthorization } = require("./verifyToken.js");
const { verifyTokenAndAdmin } = require("./verifyToken.js");
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

//deleting user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
     try{
          await user.findByIdAndDelete(req.params.id);
          res.status(200).json("user has been deleted");
     }catch(err){
          res.status(500).json(err);
     };
});

//get user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res)=>{
     try{
          const auser = await user.findById(req.params.id);
          const { password, ...others} = auser._doc;

          res.status(200).json(others);
     }catch(err){
          res.status(500).json(err);
     };
});

module.exports = router;