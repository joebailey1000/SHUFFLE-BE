const db = require('../db/connection')

exports.fetchUsers = () => {
    return db.query(`SELECT * FROM users`)
    .then(({rows}) => {
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
            return rows[0];
        })
}

exports.patchUserWeightings = (userId, weightings) => {
    const {
        popularity_weighting,
        danceability_weighting,
        energy_weighting,
        acousticness_weighting,
        instrumentalness_weighting,
        liveness_weighting,
        valence_weighting,
        tempo_weighting
    } = weightings;
    return db.query(
        `UPDATE users
         SET popularity_weighting = popularity_weighting + $1,
             danceability_weighting = danceability_weighting + $2,
             energy_weighting = energy_weighting + $3,
             acousticness_weighting = acousticness_weighting + $4,
             instrumentalness_weighting = instrumentalness_weighting + $5,
             liveness_weighting = liveness_weighting + $6,
             valence_weighting = valence_weighting + $7,
             tempo_weighting = tempo_weighting + $8
         WHERE user_id = $9
         RETURNING *;`,
        [
            popularity_weighting,
            danceability_weighting,
            energy_weighting,
            acousticness_weighting,
            instrumentalness_weighting,
            liveness_weighting,
            valence_weighting,
            tempo_weighting,
            userId
        ]
    );
};