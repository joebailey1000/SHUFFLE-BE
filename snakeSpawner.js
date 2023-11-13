const { execFile, spawn } = require('child_process')
const fs = require('fs/promises')
const db = require('./db/connection.js')

const subprocess = spawn('bad_command');

subprocess.on('error', (err) => {
  console.log(err);
});

async function spawnSnake(networkInput, updateWeights) {
  const python3 = spawn('python3', [`${__dirname}/python/neural_network_class.py`, JSON.stringify(networkInput), updateWeights])

  python3.stdout.on('data', (data) => {
    console.log('stdout:'+data)
    return data;
  });

  python3.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python3.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  
}

module.exports = {
  spawnSnake
}