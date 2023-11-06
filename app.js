const { getSongs } = require('./controllers/songs.controllers')

const express=require('express')
const app=express()

app.get('/healthcheck',(req,res,next)=>res.status(200).send({msg: 'Hello World!'}))

const server = app.listen(9090,()=>console.log('listening on 9090'))

app.get("/api/songs", getSongs)


module.exports={
  app,
  server
}