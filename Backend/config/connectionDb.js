const mongoose = require("mongoose");
const MONGOURL = require("dotenv").config();

const connectDB = async () => {
await mongoose.connect(process.env.MONGOURL).then((res)=>
console.log("connection started ...."))
};

module.exports = connectDB;
