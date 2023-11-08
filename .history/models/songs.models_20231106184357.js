const db = require('../db/connection')
const { fetchSongsQuery } = require('./utils/queryutils')


exports.fetchSongs = (query) => {
    query = fetchSongsQuery(query)

    return db.query(query).then(({ rows }) => {
        return rows})
    }