const { Pool } = require('pg');

const ENV = process.env.NODE_ENV || 'test'

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

const config = {};

if (process.env.NODE_ENV === 'production') {
  config.connectionString = process.env.NODE_ENV
  config.max = 2
}

module.exports = new Pool(config);
