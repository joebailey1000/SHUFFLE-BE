const { fetchSongs } = require('../models/songs.models')


exports.getSongs = (req, res, next) => {
    fetchSongs().then((data) => {
        res.status(200).send(data)
    })
}