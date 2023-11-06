const { fetchSongs } = require('../models/songs.models')


exports.getSongs = (req, res, next) => {
    fetchSongs().then((data) => {
        console.log(data, "<<< DATA")
        res.status(200).send({ songs })
    })



}