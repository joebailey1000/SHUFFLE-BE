const { readFileSync } = require('fs')
const seed = require('./db/seeds/seed')
const fs = require('fs')

"This script writes the top artist songs to a JSON file"


// const songData = fs.readFileSync('./db/data/test/songs-test.json', 'utf-8')
// const userData = fs.readFileSync('./db/data/test/users-test.json', 'utf-8')

const songData = fs.readFileSync('./db/data/development/filteredTracks3.json', 'utf-8')
const topArtists = fs.readFileSync('./db/data/topArtists.json', 'utf-8')    
const songDataParsed = JSON.parse(songData)
const topArtistsParsed = JSON.parse(topArtists)

const songs = []


for (let i = 0; i < songDataParsed.length; i++) {
    let artists = songDataParsed[i].artists
    const artistsArray = artists.split("")
    artistsArray[1] = '"'
    artistsArray[artistsArray.length - 2] = '"'
    try {
        artists = JSON.parse(artistsArray.join(""))
        songDataParsed[i].artists = artists
        if (topArtistsParsed.includes(artists[0])) songs.push(songDataParsed[i])
    }
    catch (err) {
    }
}

const stringifySongs = JSON.stringify(songs)

fs.writeFileSync('./db/data/topartistSongs.json', stringifySongs, 'utf-8')