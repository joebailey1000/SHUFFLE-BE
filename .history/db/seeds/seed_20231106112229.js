const format = require('pg-format')
const db = require('../connection')
const { normaliseDate } = require('../utils')

const seed = ({songData, userData}) => {
    return db.query(`DROP TABLE IF EXISTS rankings;`)
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS users;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS songs;`)
    })
    .then(() => {
        return db.query(`CREATE TABLE songs (
            song_id VARCHAR(255)  PRIMARY KEY,
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
            tempo FLOAT NOT NULL
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
            song_id  VARCHAR(255) REFERENCES songs(song_id),
            ranking INTEGER NOT NULL
        );`)})
    .then( () => songData = JSON.parse(songData))
    .then((data) => {
        const songData = data.map((song) => {
            dateFormatted = normaliseDate(song.release_date)
            return [
                song.id,
                song.name,
                song.artists, //ONLY FIRST ARTIST!
                dateFormatted,
                song.popularity,
                song.danceability,
                song.energy,
                song.loudness,
                song.acousticness,
                song.instrumentalness,
                song.liveness,
                song.valence,
                song.tempo,
            ]
        })
        const queryString = format(`INSERT INTO songs (song_id,title, artist, modernity, popularity, danceability, energy, loudness, acousticness, instrumentalness, liveness, valence, tempo) VALUES %L RETURNING *;`, songData)
        return db.query(queryString)
    })
    .then(() => userData = JSON.parse(userData))
    .then((data) => {
        const userData = data.map((user) => {
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
        console.log(userData)
        const queryString = format(`INSERT INTO users (username, popularity_weighting, danceability_weighting, energy_weighting, acousticness_weighting, instrumentalness_weighting, liveness_weighting, valence_weighting, tempo_weighting) VALUES %L RETURNING *;`, userData)
        return db.query(queryString)
    })
}

module.exports = seed
