const db = require('../db/connection')


exports.fetchSongs = (query) => {
    const validSongQueries = ['title', 'artist', 'id', 'release_date', 'popularity', 'danceability', 'energy', 'loudness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo', 'limit', 'random']

    let query = `SELECT * FROM songs`
    if (query.random) query += " ORDER BY RANDOM() LIMIT 1"

    const songQueries = Object.keys(query).filter((key) => validSongQueries.includes(key))

    if (songQueries.length) {
        query += " WHERE "
        
        if (query.title) query += `title='${query.title}' AND `
        if (query.artist) query += `artist='${query.artist}' AND `
    }
    else if (query.limit) query += ` LIMIT ${query.limit}`
    return db.query(query).then(({ rows }) => {
        return rows})
    }