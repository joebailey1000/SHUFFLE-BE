const { getTrackInfo }  = require('./deezApi')
const fs = require('fs')


const fetchTrackInfo = (testData) => {
    return getTrackInfo(testData[6].name, testData[6].artists)
    .then((trackInfo)=> {
        return trackInfo
    })
}

module.exports = { fetchTrackInfo } 

// take data from dataset
// pass data (name + artist) to fetchTrackInfo
// fetchTrackInfo returns deezer data
// then we take out album art url and mp3 url


// getDataFromWherever.then(data).then(getTrackInfo(data.artist, data.name))
