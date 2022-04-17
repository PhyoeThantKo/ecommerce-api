const router =require("express").Router();
const User =require("../models/user.js");
const CryptoJs = require("crypto-js");

//Register
router.post("/register", async (req, res) => {
     const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_PSW).toString(),
     });

     try{
          const savedUser = await newUser.save();
          res.status(201).json(savedUser);
     }catch(err){
          res.status(500).json(err);
     }
});

//Login
router.post("/login", async (req, res) => {
     try{
          const user = await User.findOne({ username: req.body.username });
          !user && res.status(401).json("Wrong credentials!");

          const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET_PSW);
          const oldpsw = hashedPassword.toString(CryptoJs.enc.Utf8);

          oldpsw !== req.body.password && res.status(401).json("Wrong Password");

          const { password, ...others} = user._doc;
          res.status(200).json(others);
     }catch(err){
          res.status(500).json(err);
     }
});

module.exports = router;