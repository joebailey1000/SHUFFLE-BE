const axios = require('axios')
const { fetchSongs } = require('../models/songs.models')

const deezApi = axios.create({
    baseURL: 'https://api.deezer.com'
});

<<<<<<<< HEAD:utils/deezApi.js
//we want to query our database???


// a list of 10 songs to play based on the spotify playlist


const getTrackInfo = async (songQuery) => {
========
const getTrackInfo = (testData) => {
    testDataParsed = JSON.parse(testData)
    const title = testDataParsed[6].name
    const artist = testDataParsed[6].artists[0]
    const query = `${title}+${artist}`;
>>>>>>>> main:utils/deezApi.jsx
    
    const title = songQuery.title
    const artist = songQuery.artist
    console.log(songQuery)
    const query = `${title} ${artist}`;

    return deezApi.get('/search', {
        params: {
            q: query,
        },
        timeout: 5000,
    })
    .then(res => {
        return [res.data.data[0]]
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

module.exports = { deezApi, getTrackInfo }