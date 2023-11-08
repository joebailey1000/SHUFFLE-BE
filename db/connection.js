const { Pool } = require('pg');

const ENV = process.env.NODE_ENV || 'test'

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

const config = {};

if (process.env.NODE_ENV === 'production') {
  config.connectionString = process.env.NODE_ENV
  config.max = 2
}

module.exports = new Pool(config);
