const { readFileSync } = require('fs')
const seed = require('./db/seeds/seed')
const fs = require('fs')


songData = fs.readFileSync('./db/data/test/songs-test.json', 'utf-8')


seed({songData})

