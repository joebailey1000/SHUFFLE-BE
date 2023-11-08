const { Pool } = require('pg');

console.log(process.env.NODE_ENV)

const ENV = process.env.NODE_ENV || 'test'

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

const config = {};

if (process.env.NODE_ENV === 'production') {
  config.connectionString = process.env.NODE_ENV
  config.max = 2
}

module.exports = new Pool(config);
