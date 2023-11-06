const { fetchSongs } = require('../models/songs.models')


exports.getSongs = (req, res, next) => {
    fetchSongs().then((songs) => {
        res.status(200).send({ songs })
    })



}