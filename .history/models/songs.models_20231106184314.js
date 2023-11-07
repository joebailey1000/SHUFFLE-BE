const db = require('../db/connection')


exports.fetchSongs = (query) => {
    const validSongQueries = ['title', 'artist', 'id', 'release_date', 'popularity', 'danceability', 'energy', 'loudness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo', 'limit', 'random']

    let query = `SELECT * FROM songs`

    const songQueries = lodash.pick(query, validSongQueries)
    if (!query.random) {
        
        Object.keys(songQueries).forEach((key, index) => {
            if (index === 0) query += " WHERE "
            query += `${key} = '${songQueries[key]}'`
            if (index < songQueries.length - 1) query += " AND "
        })

        if (query.limit) query += ` LIMIT ${query.limit}`
    }
    else query += " ORDER BY RANDOM() LIMIT 1"

    return db.query(query).then(({ rows }) => {
        return rows})
    }