const { add } = require('lodash')
const { getSongs } = require('./controllers/songs.controllers')
const { getEndpoints } = require('./controllers/endpoints.controller')
const { getUsers, addNewUser, updateUserWeightings, getUserRatings, addNewUserRating, getSongByNetworkRating } = require('./controllers/users.controllers')
const { handleErrors } = require('./controllers/errors.controllers')
const cors = require('cors')

const express=require('express')

const app = express()

app.use(express.json())

app.use(cors({ origin: ['http://localhost:19006', 'http://shufl-be.onrender.com', 'https://shufl-be.onrender.com'], credentials: true }))

app.get('/healthcheck',(req,res,next)=>res.status(200).send({msg: 'Hello World!'}))

app.get("/api", getEndpoints);

app.get("/api/songs", getSongs)

app.get("/api/users", getUsers)

app.post("/api/users", addNewUser)

app.patch("/api/users/:id", updateUserWeightings)

app.get("/api/users/:id/ratings", getUserRatings)

app.post("/api/users/ratings", addNewUserRating)

app.get("/api/users/:id/recs", getSongByNetworkRating)

app.use((err,req,res,next)=>handleErrors(err, req, res, next))


module.exports={
  app
}