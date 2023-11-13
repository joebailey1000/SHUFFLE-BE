const { fetchSongs } = require('../models/songs.models')


exports.getSongs = (req, res, next) => {
    fetchSongs(req.query).then((data) => {
        
    if(data.length === 0){
        res.status(404).send({error: "Not found, try another artist or song"})
    }        
    else 
    
        res.status(200).send({songs: data})
    })
    
}
