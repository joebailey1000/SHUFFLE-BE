const fs = require('fs/promises')

fs.writeFile(`${__dirname}/local_data/weights.json`, JSON.stringify({
  danceability: Math.random(),
  energy: Math.random(),
  speechiness: Math.random(),
  acousticness: Math.random(),
  instrumentalness: Math.random(),
  liveness: Math.random(),
  valence: Math.random()
}))
