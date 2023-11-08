const inquirer = require('inquirer')
const fs = require('fs/promises')
const {spawnSnake} = require('./snakeSpawner')

function getSong() {
  return fs.readFile(`${__dirname}/../spotify_data/archive/filteredTracks.json`, 'utf8')
    .then((file) => {
      const randomSong=JSON.stringify(JSON.parse(file)[Math.round(Math.random() * 296682)])
      return Promise.all([randomSong,fs.writeFile(`${__dirname}/local_data/currentSong.json`, randomSong)])
    })
}

function promptLoop(){
  return getSong()
    .then(([song,something])=>{
      const songObject = JSON.parse(song)
      console.log('name:',songObject.name, 'artists:',songObject.artists)
      return song
    }).then((song)=>{
      return fs.writeFile(`${__dirname}/local_data/currentSong.json`,song)
    }).then(()=>{
      return inquirer.prompt({
        name:'rating',
        message:'Rate the song out of 10'
      })
    }).then((res)=>{
      return fs.writeFile(`${__dirname}/local_data/currRating.json`,JSON.stringify(res))
    }).then(()=>spawnSnake())
    .then(()=>promptLoop())
}

promptLoop()