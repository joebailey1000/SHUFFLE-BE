const { getSongs } = require('./controllers/songs.controllers')

const express=require('express')
const app=express()

app.get('/healthcheck',(req,res,next)=>res.status(200).send({msg: 'Hello World!'}))

app.get("/api/songs", getSongs)

app.use((err,req,res,next)=>{
  console.error(err)
  res.status(500).send({msg:'woof'})
})

module.exports={
  app
}