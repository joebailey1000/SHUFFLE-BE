const format = require('pg-format')
const db = require('../connection')
const { normaliseDate, normaliseTempo } = require('../utils')


const seed = (songData, userData, rankingData) => {
    return db.query(`DROP TABLE IF EXISTS rankings;`)
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS users;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS songs;`)
    })
    .then(() => {
        return db.query(`CREATE TABLE songs (
            song_id SERIAL PRIMARY KEY,
            spotify_id VARCHAR(255) NOT NULL,
            deezer_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            artist VARCHAR(255) NOT NULL,
            modernity FLOAT NOT NULL,
            popularity FLOAT NOT NULL,
            danceability FLOAT NOT NULL,
            energy FLOAT NOT NULL,
            loudness FLOAT NOT NULL,
            acousticness FLOAT NOT NULL,
            instrumentalness FLOAT NOT NULL,
            liveness FLOAT NOT NULL,
            valence FLOAT NOT NULL,
            tempo FLOAT NOT NULL,
            preview VARCHAR(255) NOT NULL,
            album VARCHAR(255) NOT NULL,
            link VARCHAR(255) NOT NULL,
            albumcover VARCHAR(255) NOT NULL
        );`)})
    .then(() => {
        return db.query(`CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            popularity_weightings VARCHAR(100) NOT NULL,
            danceability_weightings VARCHAR(100) NOT NULL,
            energy_weightings VARCHAR(100) NOT NULL,
            acousticness_weightings VARCHAR(100) NOT NULL,
            instrumentalness_weightings VARCHAR(100) NOT NULL,
            liveness_weightings VARCHAR(100) NOT NULL,
            valence_weightings VARCHAR(100) NOT NULL,
            tempo_weightings VARCHAR(100) NOT NULL,
            output_weightings VARCHAR(100) NOT NULL
        );`)})
    .then(() => {
        return db.query(`CREATE TABLE rankings (
            ranking_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            song_id  INTEGER REFERENCES songs(song_id),
            ranking INTEGER NOT NULL,
            network_prediction FLOAT
        );`)})
    .then(() => {
        const FormattedSongData = songData.map((song) => {
            let dateFormatted = normaliseDate(song.release_date)
            let tempo = normaliseTempo(Number(song.tempo))
            let popularity = song.popularity / 100
            return [
                song.spotifyID,
                song.deezerID,
                song.title,
                song.artist, //ONLY FIRST ARTIST!
                popularity,
                dateFormatted,
                Number(song.danceability),
                Number(song.energy),
                Number(song.loudness),
                Number(song.acousticness),
                Number(song.instrumentalness),
                Number(song.liveness),
                Number(song.valence),
                tempo,
                song.preview,
                song.album,
                song.link,
                song.albumcover,
            ]
        })
        const queryString = format(`INSERT INTO songs (spotify_id, deezer_id, title, artist, popularity, modernity, danceability, energy, loudness, acousticness, instrumentalness, liveness, valence, tempo, preview, album, link, albumcover) VALUES %L RETURNING *;`, FormattedSongData)
        return db.query(queryString)
    })
    .then((data) => {
        const FormattedUserData = userData.map((user) => {
            return [
                user.username,
                ...[...Array(9)].map(()=> [...Array(3)].map(()=> Math.random()).join(','))
            ]
        })
        const queryString = format(`INSERT INTO users (username, popularity_weightings, danceability_weightings, energy_weightings, acousticness_weightings, instrumentalness_weightings, liveness_weightings, valence_weightings, tempo_weightings, output_weightings) VALUES %L RETURNING *;`, FormattedUserData)
        return db.query(queryString)
    })
    .then( () => {
        if (!rankingData) return
        const FormattedRankingData = rankingData.map((ranking) => {
            return [
                ranking.user_ID,
                ranking.song_ID,
                ranking.ranking
            ]
        })
        const queryString = format(`INSERT INTO rankings (user_id, song_id, ranking) VALUES %L RETURNING *;`, FormattedRankingData)
        return db.query(queryString)
    })

}

module.exports = seed
