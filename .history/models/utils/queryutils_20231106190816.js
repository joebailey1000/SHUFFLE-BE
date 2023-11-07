const lodash = require('lodash')


exports.fetchSongsQuery = (query) => {
    const validSongQueries = ['title', 'artist', 'song_id', 'release_date', 'popularity', 'danceability', 'energy', 'loudness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo']

    let sqlQuery = `SELECT * FROM songs`


    const songQueries = lodash.pick(query, validSongQueries)


    if (!query.random) {

        Object.keys(songQueries).forEach((key, index) => {
            let value = decodeURIComponent(songQueries[key])
            if (!(key === "title" || key === "artist")) value = Number(value)
            else value = `'${value}'`

            console.log("VALUE", value)

            if (index === 0) sqlQuery += " WHERE "
            sqlQuery += `${key} = ${value}`
            if (index < songQueries.length - 1) sqlQueryuery += " AND "
        })
        if (query.limit) sqlQuery += ` LIMIT ${query.limit}`
    }
    else sqlQuery += " ORDER BY RANDOM() LIMIT 1"

    console.log(sqlQuery)

    return sqlQuery
}