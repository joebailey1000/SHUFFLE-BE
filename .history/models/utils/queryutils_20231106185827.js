const lodash = require('lodash')


exports.fetchSongsQuery = (query) => {
    const validSongQueries = ['title', 'artist', 'id', 'release_date', 'popularity', 'danceability', 'energy', 'loudness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo']

    let sqlQuery = `SELECT * FROM songs`


    const songQueries = lodash.pick(query, validSongQueries)

    if (!query.random) {

        Object.keys(songQueries).forEach((key, index) => {
            if (index === 0) sqlQuery += " WHERE "
            sqlQuery += `${key} = '${encodeURIComponent(songQueries[key])}'`
            if (index < songQueries.length - 1) sqlQueryuery += " AND "
        })
        if (query.limit) sqlQuery += ` LIMIT ${query.limit}`
    }
    else sqlQuery += " ORDER BY RANDOM() LIMIT 1"

    return sqlQuery
}