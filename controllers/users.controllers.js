const { escapeRegExp } = require('lodash')
const { fetchUsers, postNewUser, patchUserWeightings, fetchUserRatings, postNewUserRatings } = require('../models/users.models')

exports.getUsers = (req, res, next) => {
    return fetchUsers().then((users) => {
        res.status(200).send({users})
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
        tempo_weighting } = req.body;
        postNewUser(username,
            popularity_weighting,
            danceability_weighting,
            energy_weighting,
            acousticness_weighting,
            instrumentalness_weighting,
            liveness_weighting,
            valence_weighting,
            tempo_weighting)
            .then((users) => {
                res.status(201).send({users})
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
        tempo_weighting
    } = req.body;

    const weightingsToUpdate = {
        popularity_weighting: popularity_weighting || 0,
        danceability_weighting: danceability_weighting || 0,
        energy_weighting: energy_weighting || 0,
        acousticness_weighting: acousticness_weighting || 0,
        instrumentalness_weighting: instrumentalness_weighting || 0,
        liveness_weighting: liveness_weighting || 0,
        valence_weighting: valence_weighting || 0,
        tempo_weighting: tempo_weighting || 0
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
        res.status(200).send({ratings: data})
    })}

exports.addNewUserRating = (req, res, next) => {
    postNewUserRatings(req.body).then((data) => {
        res.status(201).send({ratings: data})
    }).catch(next)}