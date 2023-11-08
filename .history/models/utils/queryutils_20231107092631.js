const lodash = require('lodash')


exports.fetchSongsQuery = (query) => {


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
    let conditions = [];

    if (!query.random) {
        songQueriesKeys.forEach((key) => {
            conditions.push(equality(key, decodeURIComponent(songQueries[key])))
            
        })

        console.log(conditions, "CONDITIONS")

        if (conditions.length > 0) sqlQuery += ` WHERE ${conditions.join(' AND ')}`;

        if (query.limit) sqlQuery += ` LIMIT ${query.limit}`;
    } else sqlQuery += " ORDER BY RANDOM() LIMIT 1";
    
    return sqlQuery;
}