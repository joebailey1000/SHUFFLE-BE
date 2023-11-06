const songData = require('../db/data/test/songs-test.json')
const userData = require('../db/data/test/users-test.json')

export const songData = fs.readFileSync('./db/data/test/songs-test.json', 'utf-8')
export const userData = fs.readFileSync('./db/data/test/users-test.json', 'utf-8')
