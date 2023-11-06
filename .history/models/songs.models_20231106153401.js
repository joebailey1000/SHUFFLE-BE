const db = require('../db/connection')


exports.fetchSongs = () => {
    // console.log("GET HERE")
    // console.log(db, "db")
    return db.query(`SELECT * FROM songs`).then(({ rows }) => {
        console.log(rows)
        return rows})
    }