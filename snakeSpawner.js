const { execFile, spawn } = require('child_process')
const fs = require('fs/promises')
const db = require('./db/connection.js');
const { type } = require('os');

const subprocess = spawn('bad_command');

subprocess.on('error', (err) => {
  console.log(err);
});

function spawnSnake(networkInput, updateWeights) {
  return new Promise((resolve, reject) => {
    const python3 = spawn('python3', [`${__dirname}/python/neural_network_class.py`, JSON.stringify(networkInput), updateWeights])

    let arr = []

    python3.stdout.on('data', (data) => {
      arr.push(Number(String(data)))
    });

    python3.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      reject(data)
    });

    python3.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(arr[0])
    });
  })
  
  
}

module.exports = {
  spawnSnake
}