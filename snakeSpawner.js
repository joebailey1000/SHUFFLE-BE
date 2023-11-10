const { execFile, spawn } = require('child_process')
const fs = require('fs/promises')
const db = require('./db/connection.js')

const subprocess = spawn('bad_command');

subprocess.on('error', (err) => {
  console.error(err);
});

function spawnSnake() {
  const python3 = spawn('python3', [`${__dirname}/python/test.py`])

  python3.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  python3.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python3.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

function executeNetwork({user_id, song_id, ranking}){
    db.query('DROP TABLE IF EXISTS network_input;')
    .then(()=> {
      db.query(`
      CREATE TABLE network_input (
        user_id INTEGER REFERENCES users(user_id),
        song_id INTEGER REFERENCES songs(song_id),
        ranking INTEGER NOT NULL
      );
      `)
    })
    .then(()=> {
      db.query(`
      INSERT INTO network_input (
        user_id, song_id, ranking
      ) VALUES ($1, $2, $3)`, [user_id, song_id, ranking])
    })
    .then(()=> spawnSnake())
}

module.exports = {
  spawnSnake, executeNetwork
}