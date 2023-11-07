const lodash = require('lodash');

exports.fetchSongsQuery = (query) => {

    "Returns an object with a min and max"
    const rangeLimits = (value) => {

        const obj = {}
        if ((/_min$/).test(value)) obj.min = songQueries[value]
        if ((/_max$/).test(value)) obj.max = songQueries[value]
        if (obj.min || obj.max) return {attribute: value.replace(/_min$|_max$/, ""), ...obj}
        console.log(obj, "OBJ")
        return false
    }

    const generateQuery = () => {

        if (query.random) return conditions.push(" ORDER BY RANDOM() LIMIT 1")

        if (minsMaxs.length){
            minsMaxs.forEach((key) => {
                const range = rangeLimits(key)
                console.log(range, "range")
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
    const minsMaxs = {}

    console.log(songQueries, "song queries")

    songQueriesKeys.forEach((key) => {
        if (!((/_min$/).test(key) || (/_max$/).test(key))) return  
        let attribute = key.replace(/_min$|_max$/, "")
        minsMaxs[attribute] = {}
        if ((/_min$/).test(key)) minsMaxs[key].min = songQueries[key]
        if ((/_max$/).test(key)) minsMaxs[key].max = songQueries[key]
    })

    console.log(minsMaxs, "mins maxs")

    generateQuery()

    sqlQuery += conditions.join(" AND ")
    if (query.limit) sqlQuery += ` LIMIT ${query.limit}`

    return sqlQuery

}