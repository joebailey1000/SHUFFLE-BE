const { add } = require('lodash')
const { getSongs } = require('./controllers/songs.controllers')
const { getUsers, addNewUser } = require('./controllers/users.controllers')
const cors = require('cors')

const express=require('express')

const app = express()

app.use(express.json())

app.use(cors({ origin: ['http://localhost:19006', 'http://shufl-be.onrender.com', 'https://shufl-be.onrender.com'], credentials: true }))

app.get('/healthcheck',(req,res,next)=>res.status(200).send({msg: 'Hello World!'}))

app.get("/api/songs", getSongs)

app.get("/api/users", getUsers)

app.post("/api/users", addNewUser)

app.use((err,req,res,next)=>{
  console.error(err)
  res.status(500).send({msg:'woof'})
})

module.exports={
  app
}