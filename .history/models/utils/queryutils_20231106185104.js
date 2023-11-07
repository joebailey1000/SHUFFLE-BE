const lodash = require('lodash')


exports.fetchSongsQuery = (query) => {
    const validSongQueries = ['title', 'artist', 'id', 'release_date', 'popularity', 'danceability', 'energy', 'loudness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo', 'limit', 'random']

    let sqlQuery = `SELECT * FROM songs`

    console.log(query, "query")

    const songQueries = lodash.pick(query, validSongQueries)
    if (!query.random) {
        
        console.log("HI")

        console.log(query.limit)

        Object.keys(songQueries).forEach((key, index) => {
            if (index === 0) sqlQuery += " WHERE "
            query += `${key} = '${songQueries[key]}'`
            if (index < songQueries.length - 1) sqlQueryuery += " AND "
        })

        if (query.limit > 0) sqlQuery += ` LIMIT ${query.limit}`
    }
    else sqlQuery += " ORDER BY RANDOM() LIMIT 1"

    console.log(sqlQuery)

    return sqlQuery
}