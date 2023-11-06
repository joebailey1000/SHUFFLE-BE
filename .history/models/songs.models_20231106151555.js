const db = require('../db/connection')


exports.fetchSongs = () => {
    console.log("GET HERE")
    console.log(db, "db")
    return db.query(`SELECT * FROM songs`).then((result) => {
        console.log(result, "result")
        return result.rows})
    }