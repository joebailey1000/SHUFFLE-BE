const lodash = require('lodash');

exports.fetchSongsQuery = (query) => {

    const generateQuery = (query) => {

        if (minsMaxs.length){
            minsMaxs.forEach((key) => {
                const range = rangeLimits(key)
                if (range.min && range.max) conditions.push(`${range.attribute} BETWEEN ${range.min} AND ${range.max}`)
                else if (range.min && !range.max) conditions.push(`${range.attribute} >= ${range.min}`)
                else if (!range.min && range.max) conditions.push(`${range.attribute} <= ${range.max}`)
            })
        }
        else {
            songQueriesKeys.forEach((key) => {
                conditions.push(`${key} = ${songQueries[key]}`)
            })
        }



    }

    console.log(query, "QUERY")

    "Returns an object with a min and max"
    const rangeLimits = (value) => {
        const obj = {}
        if ((/_min$/).test(value)) obj.min = songQueries[value]
        if ((/_max$/).test(value)) obj.max = songQueries[value]
        if (obj.min || obj.max) return {attribute: value.replace(/_min$|_max$/, ""), ...obj}
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
    const songQueriesKeys = Object.keys(songQueries)
    // fid maxs and minimums and deal with ranges first
    // then deal with the rest of the queries

    const minsMaxs = songQueriesKeys.filter((key) => (/min$|max$/).test(key) )







    if (!query.random) {

        songQueriesKeys.forEach((attribute) => {
            console.log(attribute, "ATTRIBUTE")
            const range = rangeLimits(attribute)
            console.log(range, "RANGE")
            if (range.min && range.max) conditions.push(`${attribute} BETWEEN ${range.min} AND ${range.max}`)
            else if (range.min && !range.max) conditions.push(`${attribute} >= ${range.min}`)
            else if (!range.min && range.max) conditions.push(`${attribute} <= ${range.max}`)
            else if (songQueries[attribute]) conditions.push(`${attribute} = ${attribute}`)
            
            if (songQueries[min] && songQueries[max]) conditions.push(`${attribute} BETWEEN ${range.min} AND ${range.max}`)
            else if (songQueries[min] && !songQueries[max]) conditions.push(`${attribute} >= ${range.min}`)
            else if (!songQueries[min] && songQueries[max]) conditions.push(`${attribute} <= ${range.max}`)
            else if (songQueries[attribute]) conditions.push(`${attribute} = ${songQueries.attribute}`) 
    })

    if (query.limit) sqlQuery += ` LIMIT ${query.limit}`
    }
    else sqlQuery += " ORDER BY RANDOM() LIMIT 1";

    console.log(conditions, "CONDITIONS")

    return sqlQuery;
}