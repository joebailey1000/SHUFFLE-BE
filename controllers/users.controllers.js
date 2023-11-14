const { escapeRegExp } = require('lodash')
const { spawnSnake } = require('../snakeSpawner')
const { fetchUsers, postNewUser, patchUserWeightings, fetchUserRatings, postNewUserRatings } = require('../models/users.models')
const { fetchSongs } = require('../models/songs.models')

exports.getUsers = (req, res, next) => {
  const { username } = req.query
  return fetchUsers(username).then((users) => {
    res.status(200).send({ users })
  }).catch(next)
}

exports.addNewUser = (req, res, next) => {
  const { username,
    popularity_weighting,
    danceability_weighting,
    energy_weighting,
    acousticness_weighting,
    instrumentalness_weighting,
    liveness_weighting,
    valence_weighting,
    tempo_weighting,
    output_weighting } = req.body;
  postNewUser(username,
    popularity_weighting,
    danceability_weighting,
    energy_weighting,
    acousticness_weighting,
    instrumentalness_weighting,
    liveness_weighting,
    valence_weighting,
    tempo_weighting,
    output_weighting)
    .then((users) => {
      res.status(201).send({ users })
    })
    .catch(next)
};

exports.updateUserWeightings = (req, res, next) => {
  const userId = req.params.id;
  const {
    popularity_weighting,
    danceability_weighting,
    energy_weighting,
    acousticness_weighting,
    instrumentalness_weighting,
    liveness_weighting,
    valence_weighting,
    tempo_weighting,
    output_weighting
  } = req.body;

  const weightingsToUpdate = {
    popularity_weighting: popularity_weighting || 0,
    danceability_weighting: danceability_weighting || 0,
    energy_weighting: energy_weighting || 0,
    acousticness_weighting: acousticness_weighting || 0,
    instrumentalness_weighting: instrumentalness_weighting || 0,
    liveness_weighting: liveness_weighting || 0,
    valence_weighting: valence_weighting || 0,
    tempo_weighting: tempo_weighting || 0,
    output_weighting: output_weighting || "",
  };
  patchUserWeightings(userId, weightingsToUpdate)
    .then((user) => {
      if (!user) {
        return Promise.reject({ status: 404, msg: "user not found" });
      }
      const returnedUser = user.rows;
      res.status(200).send(returnedUser[0]);
    })
    .catch(next);
};

exports.getUserRatings = (req, res, next) => {
  fetchUserRatings(req.params.id).then((data) => {
    res.status(200).send({ ratings: data })
  })
}

exports.addNewUserRating = async (req, res, next) => {
  const results = await spawnSnake(req.body, true, 'neural_network_class')
  postNewUserRatings(req.body, results).then((data) => {
    res.status(201).send({ ratings: data })
  }).catch(next)
}

exports.getSongByNetworkRating = (req, res, next) => {

  // res is a list of 5 songs (array with 5 song objects )
  // our results is an array of 5 ratings
  // we need an index of the highest number results/



  //send back the song with that index 
  fetchSongs({ random: true, limit: 20 })
    .then(async (songs) => {
      let results=await spawnSnake(songs,false,'rank',req.params.id)
      results=JSON.parse(results)
      res.status(200).send({song: songs[results.indexOf(Math.max(...results))]})
    })
}