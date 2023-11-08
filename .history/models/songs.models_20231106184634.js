const db = require('../db/connection')
const { fetchSongsQuery } = require('./utils/queryutils')


exports.fetchSongs = (query) => {
    const sqlQuery = fetchSongsQuery(query)
    return db.query(sqlQuery).then(({ rows }) => rows)
    }