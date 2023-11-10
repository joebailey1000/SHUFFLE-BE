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
    fs.writeFile(`${__dirname}/local_data/networkInput.json`, JSON.stringify({user_id, song_id, ranking}))
    .then(()=> spawnSnake())
}

module.exports = {
  spawnSnake, executeNetwork
}