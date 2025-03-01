const User = require("../models/user")
const Bcrypt = require("bcrypt")
const SECRET_KEY = require("dotenv").config()
const jwt = require("jsonwebtoken")

const userSignUp = async(req,res) => {
  const { email,password} = req.body
  if(!email || !password){
    return res.status(400).json({message: " email and password is required"})
  }
  let user = await User.findOne({email})
  if(user){
    return res.status(400).json({message: " email is already exist"})
  }
const hashPass = await Bcrypt.hash(password , 10)
const newUser = await User.create({
    email,password : hashPass
})

let token = jwt.sign({email,id:newUser._id},process.env.SECRET_KEY)
return res.status(200).json({token,newUser})
}

const userSignIn = async (req,res) => {
  const { email,password} = req.body
  if(!email || !password){
    return res.status(400).json({message: " email and password is required"})
  }
  let user = await User.findOne({email})
  if(user && await Bcrypt.compare(password,user.password)){
    let token = jwt.sign({email,id:user._id},process.env.SECRET_KEY)
return res.status(200).json({token,user})
  }
  else{
    return res.status(400).json({message: "invalid credentials"})
  }
    
} 

const getUser = async(req,res) => {
  const user = await User.findById(req.params.id)
    return res.json({email : user.email})
} 

module.exports = {userSignIn,userSignUp,getUser}