const db = require('../db/connection')
const lodash = require('lodash')


exports.fetchSongs = (query) => {
    const validSongQueries = ['title', 'artist', 'id', 'release_date', 'popularity', 'danceability', 'energy', 'loudness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo', 'limit', 'random']

    let query = `SELECT * FROM songs`
    if (query.random) query += " ORDER BY RANDOM() LIMIT 1"

    const songQueries = lodash.pick(query, validSongQueries)

    const songQueriesLength = Object.keys(songQueries).length

    for (let i = 0; i < songQueriesLength; i++) {
        if (i === 0) query += " WHERE "
        query += `${Object.keys(songQueries)[i]} = '${Object.values(songQueries)[i]}'`
        if (i < songQueriesLength - 1) query += " AND "
    }
    else if (query.limit) query += ` LIMIT ${query.limit}`
    return db.query(query).then(({ rows }) => {
        return rows})
    }