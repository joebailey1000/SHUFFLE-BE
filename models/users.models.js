const db = require('../db/connection')

exports.fetchUsers = (username) => {
    let query = `SELECT * FROM users`;
    if (username) {
        query += ` WHERE username = $1`;
    }

    return db.query(query, username ? [username] : [])
        .then(({ rows }) => {
            if (!rows.length) return Promise.reject({ status: 404, msg: 'No user found :(' })
            return rows
        });
};

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
        popularity_weightings,
        danceability_weightings,
        energy_weightings,
        acousticness_weightings,
        instrumentalness_weightings,
        liveness_weightings,
        valence_weightings,
        tempo_weightings)
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

exports.fetchUserRatings = (userId) => {
    return db.query(`SELECT * FROM rankings WHERE user_id = $1`, [userId])
    .then(({rows}) => rows)

}

exports.postNewUserRatings = ({user_id, song_id, ranking}) => {
    return db.query(`INSERT INTO rankings (user_id, song_id, ranking) VALUES ($1, $2, $3) RETURNING *`, [user_id, song_id, ranking])
    .then(({rows}) => rows)
}

