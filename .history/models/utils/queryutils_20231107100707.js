const lodash = require('lodash');

exports.fetchSongsQuery = (query) => {

    console.log(query, "QUERY")

    "Returns an object with a min and max"
    const rangeLimits = (value) => {
        const obj = {}
        if ((/_min$/).test(value)) obj.min = value
        if ((/_max$/).test(value)) obj.max = value
        if (obj.min || obj.max) return obj
        console.log(obj, "OBJ")
        return false
    }

    const validSongQueries = ['title', 'artist', 'song_id', 'modernity', 'popularity', 'danceability', 'energy', 'loudness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo'];
    validSongQueries.forEach((query) => {
        if (!(["title", "artist", "song_id"].includes(query))) validSongQueries.push(`${query}_min`, `${query}_max`)
    })

    let sqlQuery = `SELECT * FROM songs`
    let conditions = []
    const songQueries = lodash.pick(query, validSongQueries)

    console.log(songQueries, "SONG QUERIES")

    if (!query.random) {

        songQueries.forEach((attribute) => {
            console.log(attribute, "ATTRIBUTE")
            const range = rangeLimits(attribute)
            console.log(range, "RANGE")
            if (range.min && range.max) conditions.push(`${attribute} BETWEEN ${query[range.min]} AND ${query[range.max]}`)
            else if (range.min && !range.max) conditions.push(`${attribute} >= ${query[range.min]}`)
            else if (!range.min && range.max) conditions.push(`${attribute} <= ${query[range.max]}`)
            else if (query[attribute]) conditions.push(`${attribute} = ${query[attribute]}`)
            
            if (query[min] && query[max]) conditions.push(`${attribute} BETWEEN ${query[min]} AND ${query[max]}`)
            else if (query[min] && !query[max]) conditions.push(`${attribute} >= ${query[min]}`)
            else if (!query[min] && query[max]) conditions.push(`${attribute} <= ${query[max]}`)
            else if (query[attribute]) conditions.push(`${attribute} = ${query[attribute]}`) 
    })

    if (query.limit) sqlQuery += ` LIMIT ${query.limit}`
    }
    else sqlQuery += " ORDER BY RANDOM() LIMIT 1";

    console.log(conditions, "CONDITIONS")

    return sqlQuery;
}