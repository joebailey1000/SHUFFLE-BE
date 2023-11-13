const fs = require('fs')

const songData = JSON.parse(fs.readFileSync('./db/data/test/testSongs.json', 'utf-8'))
const userData = JSON.parse(fs.readFileSync('./db/data/test/users-test.json', 'utf-8'))
const rankingData = JSON.parse(fs.readFileSync('./db/data/test/rankings-test.json', 'utf-8'))




module.exports = { songData, userData, rankingData }