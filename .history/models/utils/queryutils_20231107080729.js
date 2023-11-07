const lodash = require('lodash')


exports.fetchSongsQuery = (query) => {
    const validSongQueries = ['title', 'artist', 'song_id', 'release_date', 'popularity', 'danceability', 'energy', 'loudness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo']

    let sqlQuery = `SELECT * FROM songs`


    const songQueries = lodash.pick(query, validSongQueries)

    const songQueriesKeys = Object.keys(songQueries)

    console.log(query, "<<< QUERY")


    if (!query.random) {

        songQueriesKeys.forEach((key, index) => {

            console.log(songQueriesKey, "songQueriesKey")

            let value = decodeURIComponent(songQueries[key])


            if (index === 0) sqlQuery += " WHERE "
            sqlQuery += `${key} = '${value}'`
            if (index < songQueriesKeys.length - 1) sqlQueryuery += " AND "
        })
        if (query.limit) sqlQuery += ` LIMIT ${query.limit}`
    }
    else sqlQuery += " ORDER BY RANDOM() LIMIT 1"

    console.log(sqlQuery)

    return sqlQuery
}