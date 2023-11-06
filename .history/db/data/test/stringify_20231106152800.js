import fs from 'fs'

const songData = fs.readFileSync('./db/data/test/songs-test.json', 'utf-8')
const userData = fs.readFileSync('./db/data/test/users-test.json', 'utf-8')


module.exports = { songData, userData }