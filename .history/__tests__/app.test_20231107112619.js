const request=require('supertest')
const {
  app
}=require('../app.js')
const seed = require('../db/seeds/seed')
const { songData, userData } = require('../db/data/test/readAndParse.js')
const db = require('../db/connection.js')
const { normaliseDate } = require('../db/utils')


beforeEach( async ()=> {
  await seed({songData, userData})
})

afterAll(()=>{
  db.end()
})

describe('GET /healthcheck',()=>{
  test('returns 200',()=>{
    return request(app)
      .get('/healthcheck')
      .expect(200)
  })
})



describe("GET /api/songs", () => {
  test("returns 200", () => {
    return request(app)
      .get("/api/songs")
      .expect(200)
  })
  test("returns an array of songs", () => {
    return request(app)
      .get("/api/songs")
      .expect(200)
      .then(({body: { songs }}) => {
        expect(songs).toHaveLength(songData.length)
      }) })

  test("returns the correct song titles", () => {
    return request(app)
    .get("/api/songs")
    .expect(200)
    .then(({body: { songs }}) => {
      expect(songs[0].title).toBe("Song A")
      expect(songs[1].title).toBe("Song B")
      expect(songs[2].title).toBe("Song C")
      expect(songs[3].title).toBe("Song D")
      expect(songs[4].title).toBe("Song E")
      expect(songs[5].title).toBe("Song F")
      expect(songs[6].title).toBe("Song G")
    })
  })

  test("returns one song when random=true is a query", () => {
    return request(app)
    .get("/api/songs?random=true")
    .expect(200)
    .then(({body: { songs }}) => {
      expect(songs).toHaveLength(1)
    })
  })

  test("returns limited number of songs when limit is a query", () => {
    return request(app)
    .get("/api/songs?limit=3")
    .expect(200)
    .then(({body: { songs }}) => {
      expect(songs).toHaveLength(3)
    })
  })

  test("returns a song with a given title when title is a query", () => {
    return request(app)
    .get("/api/songs?title=Song%20A")
    .expect(200)
    .then(({body: { songs }}) => {
      expect(songs[0].title).toBe("Song A")
    })
  })

  test("returns a song with a given artist when artist is a query", () => { 
    return request(app)
    .get("/api/songs?artist=Artist%20A")
    .expect(200)
    .then(({body: { songs }}) => {
      expect(songs[0].artist).toBe("Artist A")
    })
  })

  test("returns a song with a given id when id is a query", () => {
    return request(app)
    .get("/api/songs?song_id=001")
    .expect(200)
    .then(({body: { songs }}) => {
      expect(songs[0].song_id).toBe("001")
    })

  })

  test("returns a song with a given artist and song_id when both are queries", () => {
    return request(app)
    .get("/api/songs?artist=Artist%20A&song_id=001")
    .expect(200)
    .then(({body: { songs }}) => {
      expect(songs[0].artist).toBe("Artist A")
      expect(songs[0].song_id).toBe("001")
    })
  })

  test("returns the songs from a given artist when there are multiple songs by that artist", () => {
    return request(app)
    .get("/api/songs?artist=Artist%20G")
    .expect(200)
    .then(({body: { songs }}) => {
      const artistGSongs = songData.filter(song => song.artists[0] === "Artist G")
      expect(songs).toHaveLength(artistGSongs.length)
      songs.forEach( (song) => {
        expect(song.artist).toBe("Artist G")
      })
  })
})

  test("returns songs with a given modenity when modernity is a query", () => {
    return request(app)
    .get("/api/songs?modernity=1.0")
    .expect(200)
    .then(({body: { songs }}) => {
      const modernity1Songs = songData.filter(song => normaliseDate(song.release_date) === "1.00")
      expect(songs).toHaveLength(modernity1Songs.length)
      songs.forEach( (song) => {
        expect(song.modernity).toBe(1.00)
      })
    })
  })

  test("returns songs with a given popularity when popularity is a query", () => {
    return request(app)
    .get("/api/songs?popularity=40")
    .expect(200)
    .then(({body: { songs }}) => {
      const popularity100Songs = songData.filter(song => song.popularity === 40)
      expect(songs).toHaveLength(popularity100Songs.length)
      songs.forEach( (song) => {
        expect(song.popularity).toBe(40)
      })
    })

  })

  test("returns songs with a given danceability when danceability is a query", () => {
    return request(app)
    .get("/api/songs?danceability=0.620")
    .expect(200)
    .then( ({body: { songs }}) => {
      const danceability0620Songs = songData.filter(song => song.danceability === 0.620)
      expect(songs).toHaveLength(danceability0620Songs.length)
      songs.forEach( (song) => {
        expect(song.danceability).toBe(0.620)
      })
    })
    })

  test("returns songs with a given energy when energy is a query", () => {
    return request(app)
    .get("/api/songs?energy=0.600")
    .expect(200)
    .then( ({body: { songs }}) => {
      const energy0600Songs = songData.filter(song => song.energy === 0.600)
      expect(songs).toHaveLength(energy0600Songs.length)
      songs.forEach( (song) => {
        expect(song.energy).toBe(0.600)
      })
    })})

  test("returns songs with a given loudness when loudness is a query", () => {
    return request(app)
    .get("/api/songs?loudness=-8.250")
    .expect(200)
    .then( ({body: { songs }}) => {
      const loudnessSongs = songData.filter(song => song.loudness === -8.250)
      expect(songs).toHaveLength(loudnessSongs.length)
      songs.forEach( (song) => {
        expect(song.loudness).toBe(-8.250)
      })
    })})

  test("returns songs with a given acousticness when acousticness is a query", () => {
    return request(app)
    .get("/api/songs?acousticness=0.190")
    .expect(200)
    .then( ({body: { songs }}) => {
      const acousticnessSongs = songData.filter(song => song.acousticness === 0.190)
      expect(songs).toHaveLength(acousticnessSongs.length)
      songs.forEach( (song) => {
        expect(song.acousticness).toBe(0.190)
      })
    })})

  test("returns songs with a given instrumentalness when instrumentalness is a query", () => {
    return request(app)
    .get("/api/songs?instrumentalness=0.00200")
    .expect(200)
    .then( ({body: { songs }}) => {
      const instrumentalnessSongs = songData.filter(song => song.instrumentalness === 0.000)
      expect(songs).toHaveLength(instrumentalnessSongs.length)
      songs.forEach( (song) => {
        expect(song.instrumentalness).toBe(0.00200)
      })
    })})

  test("returns songs with a given liveness when liveness is a query", () => {
    return request(app)
    .get("/api/songs?liveness=0.085")
    .expect(200)
    .then( ({body: { songs }}) => {
      const livenessSongs = songData.filter(song => song.liveness === 0.085)
      expect(songs).toHaveLength(livenessSongs.length)
      songs.forEach( (song) => {
        expect(song.liveness).toBe(0.085)
      })
    })})

  test("returns songs with a given valence when valence is a query", () => {
    return request(app)
    .get("/api/songs?valence=0.398")
    .expect(200)
    .then( ({body: { songs }}) => {
      const valenceSongs = songData.filter(song => song.valence === 0.398)
      expect(songs).toHaveLength(valenceSongs.length)
      songs.forEach( (song) => {
        expect(song.valence).toBe(0.398)
      })
    })})


  test("returns songs with a given tempo when tempo is a query", () => {
    return request(app)
    .get("/api/songs?tempo=120.045")
    .expect(200)
    .then(({body: { songs }}) => {
      const tempoSongs = songData.filter(song => song.tempo === 120.045)
      expect(songs).toHaveLength(tempoSongs.length)
      songs.forEach( (song) => {
        expect(song.tempo).toBe(120.045)
      })
    })
  })

  test("returns songs with a range for danceability when danceability is a query", () => {
    return request(app)
    .get("/api/songs?danceability_min=0.320&danceability_max=0.630")
    .expect(200)
    .then( ( {body: { songs }}  )=> {
      const danceabilitySongs = songData.filter(song => song.danceability >= 0.320 && song.danceability <= 0.630)
      expect(songs).toHaveLength(danceabilitySongs.length)
      songs.forEach( (song) => {
        expect(song.danceability).toBeGreaterThanOrEqual(0.320)
        expect(song.danceability).toBeLessThanOrEqual(0.630)
      })
    })

    })

    test("returns a song with a range for energy and danceability", () => {
      return request(app)
      .get("/api/songs?energy_min=0.320&energy_max=0.630&danceability_min=0.320&danceability_max=0.630")
      .expect(200)
      .then( ( {body: { songs }}  )=> {
        const energySongs = songData.filter(song => song.energy >= 0.320 && song.energy <= 0.630)
        const danceabilitySongs = energySongs.filter(song => song.danceability >= 0.320 && song.danceability <= 0.630)
        expect(songs).toHaveLength(danceabilitySongs.length)
        expect(songs).toHaveLength(energySongs.length)
        songs.forEach( (song) => {
          expect(song.energy).toBeGreaterThanOrEqual(0.320)
          expect(song.energy).toBeLessThanOrEqual(0.630)
          expect(song.danceability).toBeGreaterThanOrEqual(0.320)
          expect(song.danceability).toBeLessThanOrEqual(0.630)
        })
      })})

    test("returns a song with a max value for tempo", () => {
      return request(app)
      .get("/api/songs?tempo_max=120.500")
      .expect(200)
      .then(({body: { songs }}) => {
        const tempoSongs = songData.filter(song => song.tempo <= 120.500)
        expect(songs).toHaveLength(tempoSongs.length)
        songs.forEach( (song) => {
          expect(song.tempo).toBeLessThanOrEqual(120.500)
        })
      })
    })

    test("returns a song with a range for tempo and an artist", () => {
      return request(app)
      .get("/api/songs?tempo_min=120.000&tempo_max=120.500&artist=Artist%20A")

  })
    



