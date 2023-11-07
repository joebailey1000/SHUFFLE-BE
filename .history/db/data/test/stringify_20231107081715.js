const fs = require('fs')

const songData = JSON.parse(fs.readFileSync('./db/data/test/songs-test.json', 'utf-8'))
const userData = JSON.parse(fs.readFileSync('./db/data/test/users-test.json', 'utf-8'))


module.exports = { songData, userData }