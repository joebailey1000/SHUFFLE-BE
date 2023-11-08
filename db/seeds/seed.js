const format = require('pg-format')
const db = require('../connection')
const { normaliseDate } = require('../utils')


const seed = (songData, userData) => {
    console.log(songData, "songData")
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
            popularity_weighting FLOAT NOT NULL,
            danceability_weighting FLOAT NOT NULL,
            energy_weighting FLOAT NOT NULL,
            acousticness_weighting FLOAT NOT NULL,
            instrumentalness_weighting FLOAT NOT NULL,
            liveness_weighting FLOAT NOT NULL,
            valence_weighting FLOAT NOT NULL,
            tempo_weighting FLOAT NOT NULL
        );`)})
    .then(() => {
        return db.query(`CREATE TABLE rankings (
            ranking_id INTEGER PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            song_id  INTEGER REFERENCES songs(song_id),
            ranking INTEGER NOT NULL
        );`)})
    .then(() => {
        const FormattedSongData = songData.map((song) => {
            dateFormatted = normaliseDate(song.release_date)
            return [
                song.spotifyID,
                song.deezerID,
                song.title,
                song.artist, //ONLY FIRST ARTIST!
                song.popularity,
                dateFormatted,
                song.danceability,
                song.energy,
                song.loudness,
                song.acousticness,
                song.instrumentalness,
                song.liveness,
                song.valence,
                song.tempo,
                song.preview,
                song.album,
                song.link,
                song.albumcover
            ]
        })
        const queryString = format(`INSERT INTO songs (spotify_id, deezer_id, title, artist, popularity, modernity, danceability, energy, loudness, acousticness, instrumentalness, liveness, valence, tempo, preview, album, link, albumcover) VALUES %L RETURNING *;`, FormattedSongData)
        return db.query(queryString)
    })
    .then((data) => {
        const FormattedUserData = userData.map((user) => {
            return [
                user.username,
                user.popularity_weighting,
                user.danceability_weighting,
                user.energy_weighting,
                user.acousticness_weighting,
                user.instrumentalness_weighting,
                user.liveness_weighting,
                user.valence_weighting,
                user.tempo_weighting
            ]
        })
        const queryString = format(`INSERT INTO users (username, popularity_weighting, danceability_weighting, energy_weighting, acousticness_weighting, instrumentalness_weighting, liveness_weighting, valence_weighting, tempo_weighting) VALUES %L RETURNING *;`, FormattedUserData)
        return db.query(queryString)
    })
}

module.exports = seed
