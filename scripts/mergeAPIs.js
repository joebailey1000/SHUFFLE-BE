const { get } = require('lodash')
const { getTrackInfo } = require('../utils/deezApi')
const fs = require('fs')

const spotifySongs = fs.readFileSync("./db/data/topartistSongs.json", "utf-8")
const spotifySongsParsed = JSON.parse(spotifySongs)

const firstSong = spotifySongsParsed[0]

const title = firstSong.name
const artist = firstSong.artists[0]


const songsArr = []

async function generateSongArray() {
    for (let i = 0; i < spotifySongsParsed.length; i++) {
        let obj = {}
        const title = spotifySongsParsed[i].name
        const artist = spotifySongsParsed[i].artists[0]
        try {
            const res = await getTrackInfo({title, artist})
            obj.spotifyID = spotifySongsParsed[i].id
            obj.deezerID = res[0].id
            obj.title = res[0].title
            obj.artist = res[0].artist.name
            obj.popularity = spotifySongsParsed[i].popularity
            obj.release_date = spotifySongsParsed[i].release_date
            obj.duration = spotifySongsParsed[i].duration_ms
            obj.danceability = spotifySongsParsed[i].danceability
            obj.energy = spotifySongsParsed[i].energy
            obj.loudness = spotifySongsParsed[i].loudness
            obj.speechiness = spotifySongsParsed[i].speechiness
            obj.acousticness = spotifySongsParsed[i].acousticness
            obj.instrumentalness = spotifySongsParsed[i].instrumentalness
            obj.liveness = spotifySongsParsed[i].liveness
            obj.valence = spotifySongsParsed[i].valence
            obj.tempo = spotifySongsParsed[i].tempo
            obj.preview = res[0].preview
            obj.album = res[0].album.title
            obj.link = res[0].link
            obj.albumcover = res[0].album.cover_big
            songsArr.push(obj)
        }
        catch(err) {
            console.log("ERROR", err)
        }
    
    }
}

generateSongArray().then(() => {
    fs.writeFile("./db/data/development/mergedSongs.json", JSON.stringify(songsArr), (err) => {
        if (err) console.log(err)
        else console.log("Success")
    })
})