

exports.fetchSongsQuery = (query) => {

    console.log(query, "QUERY")

    "Returns an object with a min and max"
    const rangeLimits = (value) => {
        const obj = {}
        if ((/_min$/).test(value)) obj.min = value
        if ((/_max$/).test(value)) obj.max = value
        if (obj.min || obj.max) return obj
        return false
    }

    const validSongQueries = ['title', 'artist', 'song_id', 'modernity', 'popularity', 'danceability', 'energy', 'loudness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo'];
    let sqlQuery = `SELECT * FROM songs`
    const songQueriesKeys = Object.keys(songQueries)
    let conditions = []

    if (!query.random) {
    validSongQueries.forEach((attribute) => {
        console.log("HI")
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
    }

    console.log(conditions, "CONDITIONS")

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