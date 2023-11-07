const db = require('../db/connection')


exports.fetchSongs = (query) => {
    let query = ""
    if (query.random) query += " ORDER BY RANDOM() LIMIT 1"
    return db.query(`SELECT * FROM songs`).then(({ rows }) => {
        return rows})
    }