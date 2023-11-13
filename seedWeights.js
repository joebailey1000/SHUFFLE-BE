const fs = require('fs/promises')

fs.writeFile(`${__dirname}/local_data/weights.json`, JSON.stringify({
  hiddenWeights: [...Array(8)].map(a=>[...Array(3)].map(b=>Math.random()/2)),
  outputWeights: [...Array(3)].map(b=>Math.random()/2)
}))
