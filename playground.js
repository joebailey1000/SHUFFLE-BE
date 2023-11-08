const { readFileSync } = require('fs')
const seed = require('./db/seeds/seed')
const fs = require('fs')




// const songData = fs.readFileSync('./db/data/test/songs-test.json', 'utf-8')
// const userData = fs.readFileSync('./db/data/test/users-test.json', 'utf-8')

// const songData = fs.readFileSync('./db/data/development/filteredTracks3.json', 'utf-8')
// const topArtists = fs.readFileSync('./db/data/topArtists.json', 'utf-8')    
// const songDataParsed = JSON.parse(songData)
// const topArtistsParsed = JSON.parse(topArtists)

// const songs = []


// for (let i = 0; i < songDataParsed.length; i++) {
//     let artists = songDataParsed[i].artists
//     const artistsArray = artists.split("")
//     artistsArray[1] = '"'
//     artistsArray[artistsArray.length - 2] = '"'
//     try {
//         artists = JSON.parse(artistsArray.join(""))
//         songDataParsed[i].artists = artists
//         if (topArtistsParsed.includes(artists[0])) songs.push(songDataParsed[i])
//     }
//     catch (err) {
//     }
// }

// const stringifySongs = JSON.stringify(songs)

// fs.writeFileSync('./db/data/topartistSongs.json', stringifySongs, 'utf-8')


songs = fs.readFileSync('./db/data/development/mergedSongs.json', 'utf-8')
console.log(JSON.parse(songs))

// {
//     spotifyID: '2gHZbWt9nSKbpRtbhkkEXE',
//     deezerID: 3231931,
//     title: 'It All Depends On You (Alternate Version / 1998 Digital Remaster)',
//     artist: 'Frank Sinatra',
//     popularity: '25',
//     release_date: '1961',
//     duration: '122840',
//     danceability: '0.544',
//     energy: '0.289',
//     loudness: '-13.97',
//     speechiness: '0.0579',
//     acousticness: '0.207',
//     instrumentalness: '0.0',
//     liveness: '0.158',
//     valence: '0.543',
//     tempo: '146.326',
//     preview: 'https://cdns-preview-d.dzcdn.net/stream/c-d3b81246be2586c2ba5cf0d01b49090c-4.mp3',
//     album: 'Come Dance With Me! (Remastered)',
//     link: 'https://www.deezer.com/track/3231931',
//     albumcover: 'https://e-cdns-images.dzcdn.net/images/cover/47c2ef9060ec3ca18a1708030b25c084/500x500-000000-80-0-0.jpg'