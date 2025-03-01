require('dotenv').config();
const express = require("express");
const app = express();
const connectDB = require("./config/connectionDb");
connectDB();

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/" , require("./routes/user"))
app.use("/recipes", require("./routes/recipe.js"));

// Start server
const PORT = process.env.PORT ||3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
