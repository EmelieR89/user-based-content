const express = require("express");
const cookieSession = require("cookie-session");
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


app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

app.use(cookieSession({
  name: 'GaryLovesCookies',
  maxAge: 1000 * 1000, // short duration to check easily while developing
  secret: 'apskda9s8d7236uvjbkajdnfhoias89d70f62t3yhdjhvfuastadcych',
  httpOnly: true,
}))

app.use(express.json());
app.use(userRouter);
app.use(recipeRouter);

app.use((req, res) => {
  res.status(404).json('The resource your are trying to access does not exist!')
})

app.listen(4000, () => console.log("Server is running on port 4000"));
