const { fetchSongs } = require('../models/songs.models')


exports.getSongs = (req, res, next) => {
    fetchSongs(req.query).then((data) => {
        res.status(200).send({songs: data})
    })
