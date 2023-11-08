const db = require('../db/connection')


exports.fetchSongs = () => {
    return db.query(`SELECT * FROM songs`).then(({ rows }) => {
        return rows})
    }