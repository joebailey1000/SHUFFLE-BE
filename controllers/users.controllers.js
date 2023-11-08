const { escapeRegExp } = require('lodash')
const { fetchUsers, postNewUser } = require('../models/users.models')

exports.getUsers = (req, res, next) => {
    return fetchUsers().then((users) => {
        res.status(200).send({users})
    }).catch(next)
}

exports.addNewUser = (req, res, next) => {
    console.log(req)
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