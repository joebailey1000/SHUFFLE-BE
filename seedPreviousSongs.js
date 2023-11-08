const fs = require('fs/promises')

fs.writeFile(`${__dirname}/local_data/previousSongs.json`,JSON.stringify({
  songs:[],
  ratings:[]
}))