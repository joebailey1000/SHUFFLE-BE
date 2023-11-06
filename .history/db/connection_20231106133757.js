const { Pool } = require('pg');

const ENV = process.env.NODE_ENV || 'test';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

const config = {};

config.connectionString = process.env.NODE_ENV
config.max = 2

module.exports = new Pool(config);
