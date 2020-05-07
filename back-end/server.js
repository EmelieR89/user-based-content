const express = require("express");
const userRouter = require("./routes/userRoutes");
const recipeRouter = require('./routes/recipeRoutes')
const cors = require("cors");
const mongoose = require('mongoose')
const options = { useNewUrlParser:true, useUnifiedTopology:true };


mongoose.connect('mongodb://localhost/VeganRecipes', options)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('We are connected');
  
})

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(recipeRouter);

app.listen(4000, () => console.log("Server is running on port 4000"));
