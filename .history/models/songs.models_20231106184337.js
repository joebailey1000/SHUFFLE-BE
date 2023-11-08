const db = require('../db/connection')
const { fetchSongsQuery } = require('../db/queries')


exports.fetchSongs = (query) => {
    query = 

    return db.query(query).then(({ rows }) => {
        return rows})
    }