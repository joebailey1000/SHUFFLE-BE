const db = require('../db/connection')


exports.fetchSongs = (query) => {
    console.log(query)
    return db.query(`SELECT * FROM songs`).then(({ rows }) => {
        return rows})
    }