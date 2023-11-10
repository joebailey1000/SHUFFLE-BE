const { readFileSync } = require('fs')
const seed = require('./db/seeds/seed')
const fs = require('fs')

const bananas = {banana1: "yellow", banana2: "green", banana3: "orange"}

const spreadYourBananas = [...bananas]

console.log(spreadYourBananas)

