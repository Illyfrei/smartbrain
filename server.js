const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs")

const register = require("./controllers/register")
const signin = require("./controllers/signin")
const profile = require("./controllers/profile")
const Image = require("./controllers/image")

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'password',
      database : 'smartbrain'
    }
  });

app.use(bodyParser.json())
app.use(cors())

app.get("/", (req,res) => {
    res.send("hi")
})

app.post('/signin', (req,res) => {signin.handleSignin(req,res,db, bcrypt)})

app.post("/register", (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get("/profile/:id", (req,res) => {profile.handleProfileGet(req,res,db)})

app.put("/image", (req,res) => {Image.handleImage(req,res,db)})

app.listen(3000, () => console.log("SERVER IS UP"))
