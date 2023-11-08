const db = require('../db/connection')

exports.fetchUsers = () => {
    console.log("in users model")
    return db.query(`SELECT * FROM users`)
    .then(({rows}) => {
        console.log(rows, "ROWS :)")
        return rows;
    })
}

exports.postNewUser = (username,
    popularity_weighting,
    danceability_weighting,
    energy_weighting,
    acousticness_weighting,
    instrumentalness_weighting,
    liveness_weighting,
    valence_weighting,
    tempo_weighting) => {
    return db.query(`INSERT INTO users (username,
        popularity_weighting,
        danceability_weighting,
        energy_weighting,
        acousticness_weighting,
        instrumentalness_weighting,
        liveness_weighting,
        valence_weighting,
        tempo_weighting)
        VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8, $9)
        RETURNING *`, [username,
            popularity_weighting,
            danceability_weighting,
            energy_weighting,
            acousticness_weighting,
            instrumentalness_weighting,
            liveness_weighting,
            valence_weighting,
            tempo_weighting])
        .then(({rows}) => {
            console.log(rows, "ROWS IN MODEL")
        })
}