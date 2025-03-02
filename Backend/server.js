require('dotenv').config();
const express = require("express");
const app = express();
const connectDB = require("./config/connectionDb");
connectDB();
const cors = require("cors")



app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/" , require("./routes/user"))
app.use("/recipes", require("./routes/recipe.js"));

// Start server
const PORT = process.env.PORT ||3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
