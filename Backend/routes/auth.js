const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchUser")
const JWT_SECRET = 'Harry is a goodboy';


//Route 1-Create a User using : POST "/api/auth/. Doesnt require authentication"

router.post('/createuser',
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password must be at least 5 characters').isLength({ min: 5 }),
async(req,res)=>{
  //If error return bad request as well as errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    //Check whether user with same email exists already
    let user = await User.findOne({email : req.body.email});
    if(user){
      return res.status(400).json({error:"Sorry, a user with this email exists already"});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
      user =await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data = {
        user:{
          id:user.id
        }
      }
      const authToken= jwt.sign(data, JWT_SECRET);
      res.send({authToken});
      // .then(user => res.json(user))
      // .catch(err=>{console.log(err)
      //   res.json({error:'Please enter a valid value for email'})})

    }catch(error){
      console.error(error.message);
      res.status(500).send("Internal server error")
    }
})
//Route 2-Authenticate a User using : POST "/api/auth/login no login required
router.post('/login',
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should not be empty').exists(),
async(req,res)=>{
  //If error return bad request as well as errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

  }
  const {email,password}=req.body;
  try{
    let user =await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"Please try to login with correct credentials!"});
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({error:"Please try to login with correct credentials!"});
    }
    const data = {
      user:{
        id:user.id
      }
    }
    const authToken= jwt.sign(data, JWT_SECRET);
    res.send({authToken});
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error")
  }
});

//Route 2-Get loggedin user details using : POST "/api/auth/getuser  login required
router.post('/getuser', fetchuser, async(req,res)=>{
try{
  let userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
}
catch(error){
  console.error(error.message);
  res.status(500).send("Internal server error")
}
});
module.exports = router;