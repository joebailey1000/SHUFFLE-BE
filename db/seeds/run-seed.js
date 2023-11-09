const mergedSongs = require('../data/development/mergedSongs.js')
const { userData, rankingData } = require('../data/test/readAndParse.js')
const seed = require('./seed.js')
const db = require('../connection.js')

const runSeed = async () => {
    await seed(mergedSongs, userData, rankingData)
    db.end()
}

runSeed()