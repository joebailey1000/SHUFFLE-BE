const { execFile, spawn } = require('node:child_process')
const fs = require('fs/promises')
const { dirname } = require('node:path');

const subprocess = spawn('bad_command');

subprocess.on('error', (err) => {
  console.error(err);
});

function spawnSnake() {
  const python3 = spawn('python3', [`${__dirname}/python/neural_network_class.py`])

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

module.exports = {
  spawnSnake
}