const lodash = require('lodash');

exports.fetchSongsQuery = (query) => {

    const generateMinMax = () => {
        const minsMaxs = {}
        const toOmit = []
        Object.keys(songQueries).forEach((key) => {


            if (!(/(_min|_max)$/.test(key))) return

            value = Number(songQueries[key])
    
            if (isNaN(value)) return

            toOmit.push(key)
            let attribute = key.replace(/_min|_max$/, "")
            minsMaxs[attribute] = minsMaxs[attribute] || {}
            if ((/_min$/).test(key)) minsMaxs[attribute].min = value
            if ((/_max$/).test(key)) minsMaxs[attribute].max = value
    
        })

        console.log(songQueries, "SONG QUERIES")

        console.log(toOmit, "TO OMIT")

        songQueries = lodash.omit(songQueries, toOmit)

        console.log(songQueries, "SONG QUERIES")

        return minsMaxs
    }

    const generateQuery = () => {

        console.log(songQueriesKeys, "SONG QUERIES")

        if (query.random) return sqlQuery += " ORDER BY RANDOM() LIMIT 1"

        if (Object.keys(minsMaxs).length) {
            for (let attribute in minsMaxs) {
                const range = minsMaxs[attribute]
                if (range.min && range.max) conditions.push(` ${attribute} BETWEEN ${range.min} AND ${range.max}`)
                else if (range.min && !range.max) conditions.push(` ${attribute} >= ${range.min}`)
                else if (!range.min && range.max) conditions.push(` ${attribute} <= ${range.max}`)
            }
         }
        
         songQueriesKeys.forEach((key) => {
                conditions.push(` ${key} = '${songQueries[key]}'`)
            })

    }



    const validSongQueries = ['title', 'artist', 'song_id', 'modernity', 'popularity', 'danceability', 'energy', 'loudness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo'];
    validSongQueries.forEach((query) => {
        if (!(["title", "artist", "song_id"].includes(query))) validSongQueries.push(`${query}_min`, `${query}_max`)
    })

    let sqlQuery = `SELECT * FROM songs`
    let conditions = []
    let songQueries = lodash.pick(query, validSongQueries)

    const minsMaxs = generateMinMax()

    const songQueriesKeys = Object.keys(songQueries)


    generateQuery()

    console.log(conditions, "CONDITIONS")
    if (conditions.length) sqlQuery += " WHERE"
    sqlQuery += conditions.join(" AND ")
    if (query.limit) sqlQuery += ` LIMIT ${query.limit}`

    console.log(sqlQuery, "SQL QUERY")

    return sqlQuery

}