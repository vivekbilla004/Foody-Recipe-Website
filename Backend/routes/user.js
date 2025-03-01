const express = require("express");
const router = express.Router();
const {userSignIn,userSignUp,getUser} = require("../controllers/user")

router.post("/signup" , userSignUp)
router.post("/signin",userSignIn)
router.get("/user/:id" , getUser)


module.exports = router;