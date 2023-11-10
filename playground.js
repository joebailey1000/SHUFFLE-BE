const { readFileSync } = require('fs')
const seed = require('./db/seeds/seed')
const fs = require('fs')
const {spawnSnake} = require('./snakeSpawner')


spawnSnake();
