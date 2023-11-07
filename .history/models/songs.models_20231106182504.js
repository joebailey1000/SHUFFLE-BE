const db = require('../db/connection')


exports.fetchSongs = (query) => {
    let query = `SELECT * FROM songs`
    if (query.random) query += " ORDER BY RANDOM() LIMIT 1"
    if (query.limit) query += ` LIMIT ${query.limit}`
    return db.query(query).then(({ rows }) => {
        return rows})
    }