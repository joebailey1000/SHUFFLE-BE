const { fetchSongs } = require('../models/songs.models')


exports.getSongs = (req, res, next) => {
    fetchSongs().then((data) => {
        console.log(data, "<<< DATA")
        res.status(200).send(data)
    })
}



// get data from dataset
// use that data to get album art and preview from deezer api