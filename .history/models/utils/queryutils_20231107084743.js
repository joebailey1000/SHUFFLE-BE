const lodash = require('lodash')


exports.fetchSongsQuery = (query) => {
    const validSongQueries = ['title', 'artist', 'song_id', 'modernity', 'popularity', 'danceability', 'energy', 'loudness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo']

    let sqlQuery = `SELECT * FROM songs`


    const songQueries = lodash.pick(query, validSongQueries)

    const songQueriesKeys = Object.keys(songQueries)

    if (!query.random) {    

        songQueriesKeys.forEach((key, index) => {

            let value = decodeURIComponent(songQueries[key])

            if (index === 0) sqlQuery += " WHERE "
            sqlQuery += `${key} = '${value}'`
            if (index < songQueriesKeys.length - 1) sqlQuery += " AND "
        })
        if (query.limit) sqlQuery += ` LIMIT ${query.limit}`

    }

    else sqlQuery += " ORDER BY RANDOM() LIMIT 1"

    return sqlQuery
}