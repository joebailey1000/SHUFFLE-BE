const { getSongs } = require('./controllers/songs.controllers')

const express=require('express')
const app=express()

app.use(cors({ origin: ['http://localhost:19006', 'http://shufl-be.onrender.com', 'https://shufl-be.onrender.com'], credentials: true }))

app.get('/healthcheck',(req,res,next)=>res.status(200).send({msg: 'Hello World!'}))

app.get("/api/songs", getSongs)


module.exports={
  app
}