const db = require('../db/connection')
const { fetchSongsQuery } = require('./utils/queryutils')


exports.fetchSongs = (query) => {
    const sqlQuery = fetchSongsQuery(query)
    return db.query(sqlQuery).then(({ rows }) => {
        if (!rows.length) return Promise.reject({ status: 404, msg: 'Not found, try another artist or song' })
        return rows})
    }