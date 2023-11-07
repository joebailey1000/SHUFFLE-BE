const lodash = require('lodash')


exports.fetchSongsQuery = (query) => {

    console.log(query, "QUERY")


    const equality = (key, value) => {
        console.log(value, "VALUE")
        if (value.includes('|')) {
            let [min, max] = value.split('|').map(v => parseFloat(v));

            if (!isNaN(min) && !isNaN(max)) return `${key} BETWEEN ${min} AND ${max}`

        } else return `${key} = '${value}'`

    }

    const validSongQueries = ['title', 'artist', 'song_id', 'modernity', 'popularity', 'danceability', 'energy', 'loudness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo'];
    let sqlQuery = `SELECT * FROM songs`
    const songQueries = lodash.pick(query, validSongQueries)
    const songQueriesKeys = Object.keys(songQueries)
    let conditions = []

    if (!query.random) {
    validSongQueries.forEach((attribute) => {
        const value = decodeURIComponent
        const min = attribute.replace(/_min$/, '')
        const max = attribute.replace(/_max$/, '')
        if (query[min] && query[max]) conditions.push(`${attribute} BETWEEN ${query[min]} AND ${query[max]}`)
        else if (query[min] && !query[max]) conditions.push(`${attribute} >= ${query[min]}`)
        else if (!query[min] && query[max]) conditions.push(`${attribute} <= ${query[max]}`)
        else if (query[attribute]) conditions.push(`${attribute} = ${query[attribute]}`) 


    if (!query.random) {
        songQueriesKeys.forEach((key) => {
            console.log(decodeURIComponent(songQueries[key], "decode"))
            conditions.push(equality(key, decodeURIComponent(songQueries[key])))
            
        })

        if (conditions.length > 0) sqlQuery += ` WHERE ${conditions.join(' AND ')}`;

        if (query.limit) sqlQuery += ` LIMIT ${query.limit}`;
    } else sqlQuery += " ORDER BY RANDOM() LIMIT 1";
    
    return sqlQuery;
}