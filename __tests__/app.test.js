const request=require('supertest')
const {
  app
}=require('../app.js')
const seed = require('../db/seeds/seed')
const mergedSongs = require('../db/data/development/mergedSongs')
const { userData } = require('../db/data/test/readAndParse.js')
const db = require('../db/connection.js')
const { normaliseDate, normaliseTempo } = require('../db/utils')
const cutSongs = mergedSongs.slice(0, 100)  // 100 songs only for testing


beforeEach( async ()=> {
  await seed(cutSongs, userData)
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
        expect(songs).toHaveLength(cutSongs.length)
      }) })

  test("returns the correct song length", () => {
    return request(app)
    .get("/api/songs")
    .expect(200)
    .then(({body: { songs }}) => {
      expect(songs).toHaveLength(cutSongs.length)
    })
  })

  test("returns one song when random=true is a query and limit is 1", () => {
    return request(app)
    .get("/api/songs?random=true&limit=1")
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
    .get("/api/songs?title=Stormy%20Weather")
    .expect(200)
    .then(({body: { songs }}) => {
      expect(songs[0].title).toBe("Stormy Weather")
    })
  })

  test("returns songs with a given artist when artist is a query", () => { 
    return request(app)
    .get("/api/songs?artist=Frank%20Sinatra")
    .expect(200)
    .then(({body: { songs }}) => {
      const frankSinatraSongs = cutSongs.filter(song => song.artist === "Frank Sinatra")
      expect(songs).toHaveLength(frankSinatraSongs.length)
      songs.forEach( (song) => {
        expect(song.artist).toBe("Frank Sinatra")
      })
    })
  })

  test("returns a song with a given id when id is a query", () => {
    return request(app)
    .get("/api/songs?song_id=1")
    .expect(200)
    .then(({body: { songs }}) => {
      expect(songs).toHaveLength(1)
      expect(songs[0].spotify_id).toEqual(cutSongs[0].spotifyID)
    })

  })

  test("returns a song with a given artist and song title are both queries", () => {
    return request(app)
    .get("/api/songs?artist=Frank%20Sinatra&title=Almost%20Like%20Being%20In%20Love%20(Remastered)")
    .expect(200)
    .then(({body: { songs }}) => {
      expect(songs).toHaveLength(1)
      expect(songs[0].artist).toBe("Frank Sinatra")
      expect(songs[0].title).toBe("Almost Like Being In Love (Remastered)")
    })
  })

  test("returns songs with a given modenity when modernity is a query", () => {
    return request(app)
    .get("/api/songs?modernity=1.0")
    .expect(200)
    .then(({body: { songs }}) => {
      const modernity1Songs = cutSongs.filter(song => normaliseDate(song.release_date) === "1.00")
      expect(songs).toHaveLength(modernity1Songs.length)
      songs.forEach( (song) => {
        expect(song.modernity).toBe(1.00)
      })
    })
  })

  test("returns songs with a given popularity when popularity is a query", () => {
    return request(app)
    .get("/api/songs?popularity=0.3")
    .expect(200)
    .then(({body: { songs }}) => {
      const popularitySongs = cutSongs.filter(song => song.popularity / 100 === 0.3)
      expect(songs).toHaveLength(popularitySongs.length)
      songs.forEach( (song) => {
        expect(song.popularity).toBe(0.3)
      })
    })

  })

  test("returns songs with a given danceability when danceability is a query", () => {
    return request(app)
    .get("/api/songs?danceability=0.620")
    .expect(200)
    .then( ({body: { songs }}) => {
      const danceability0620Songs = cutSongs.filter(song => song.danceability === 0.620)
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
      const energy0600Songs = cutSongs.filter(song => song.energy === 0.600)
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
      const loudnessSongs = cutSongs.filter(song => song.loudness === -8.250)
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
      const acousticnessSongs = cutSongs.filter(song => song.acousticness === 0.190)
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
      const instrumentalnessSongs = cutSongs.filter(song => song.instrumentalness === 0.000)
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
      const livenessSongs = cutSongs.filter(song => song.liveness === 0.085)
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
      const valenceSongs = cutSongs.filter(song => song.valence === 0.398)
      expect(songs).toHaveLength(valenceSongs.length)
      songs.forEach( (song) => {
        expect(song.valence).toBe(0.398)
      })
    })})


  test("returns songs with a given tempo when tempo is a query", () => {
    return request(app)
    .get("/api/songs?tempo=0.7")
    .expect(200)
    .then(({body: { songs }}) => {
      const tempoSongs = cutSongs.filter(song => normaliseTempo(Number(song.tempo)) === 0.7)
      expect(songs).toHaveLength(tempoSongs.length)
      songs.forEach( (song) => {
        expect(song.tempo).toBe(0.7)
      })
    })
  })

  test("returns songs with a range for danceability when danceability is a query", () => {
    return request(app)
    .get("/api/songs?danceability_min=0.320&danceability_max=0.630")
    .expect(200)
    .then( ( {body: { songs }}  )=> {
      const danceabilitySongs = cutSongs.filter(song => song.danceability >= 0.320 && song.danceability <= 0.630)
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
        const energySongs = cutSongs.filter(song => song.energy >= "0.320" && song.energy <= "0.630")
        const danceabilitySongs = energySongs.filter(song => song.danceability >= "0.320" && song.danceability <= "0.630")
        expect(songs).toHaveLength(danceabilitySongs.length)
        songs.forEach( (song) => {
          expect(song.energy).toBeGreaterThanOrEqual(0.320)
          expect(song.energy).toBeLessThanOrEqual(0.630)
          expect(song.danceability).toBeGreaterThanOrEqual(0.320)
          expect(song.danceability).toBeLessThanOrEqual(0.630)
        })
      })})

    test("returns a song with a max value for tempo", () => {
      return request(app)
      .get("/api/songs?tempo_max=0.9")
      .expect(200)
      .then(({body: { songs }}) => {
        const tempoSongs = cutSongs.filter(song => normaliseTempo(Number(song.tempo)) <= 0.9)
        expect(songs).toHaveLength(tempoSongs.length)
        songs.forEach( (song) => {
          expect(song.tempo).toBeLessThanOrEqual(0.9)
        })
      })
    })

    test("returns a song with a range for tempo and an artist", () => {
      return request(app)
      .get("/api/songs?tempo_min=0.5&tempo_max=0.9&artist=Roy%20Orbison")
      .expect(200)
      .then(({body: { songs }}) => {
        const tempoSongs = cutSongs.filter(song => normaliseTempo(song.tempo) >= 0.5 && normaliseTempo(song.tempo) <= 0.9)
        const artistSongs = tempoSongs.filter(song => song.artist === "Roy Orbison")
        expect(songs).toHaveLength(artistSongs.length)
        songs.forEach( (song) => {
          expect(song.tempo).toBeGreaterThanOrEqual(0.5)
          expect(song.tempo).toBeLessThanOrEqual(0.9)
          expect(song.artist).toBe("Roy Orbison")
        })
      })
    })
  })
    



  describe('GET /api/users',()=>{
    test('returns 200', ()=> {
      return request(app)
        .get('/api/users')
        .expect(200)
    })
    test('returns an array of users', ()=> {
      return request(app)
        .get('/api/users')
        .then(({body}) => {
          expect(body.users).toHaveLength(8)
        })
    })
  })

  describe('POST /api/users', ()=> {
    test('returns 201 and the new user', ()=> {
      return request(app)
      .post('/api/users')
      .send({
        username: 'Big John',
        popularity_weighting: 0.9,
        danceability_weighting: 1,
        energy_weighting: 1.1,
        acousticness_weighting: 0.7,
        instrumentalness_weighting: 1.3,
        liveness_weighting: 0.9,
        valence_weighting: 0.8,
        tempo_weighting: 1.2
      })
      .then((res) => {
        expect(res.status).toBe(201)
        expect(res.body).toMatchObject({
          users: {
            user_id: 9,
            username: 'Big John',
            popularity_weighting: 0.9,
            danceability_weighting: 1,
            energy_weighting: 1.1,
            acousticness_weighting: 0.7,
            instrumentalness_weighting: 1.3,
            liveness_weighting: 0.9,
            valence_weighting: 0.8,
            tempo_weighting: 1.2
          }
        })
      })
    })
  })

  describe.only('PATCH /api/users/:id', ()=> {
    test('returns 201 and the updated user', ()=> {
      return request(app)
      .patch('/api/users/1')
      .send({
        popularity_weighting: 0.1,
        danceability_weighting: 0.1,
        energy_weighting: 0.1,
        acousticness_weighting: 0.1,
        instrumentalness_weighting: 0.1,
        liveness_weighting: 0.1,
        valence_weighting: 0.1,
        tempo_weighting: 0.1
      })
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toMatchObject(
          {
            user_id: 1,
            username: 'Rob',
            popularity_weighting: 1.1,
            danceability_weighting: 1.1,
            energy_weighting: 1.1,
            acousticness_weighting: 1.1,
            instrumentalness_weighting: 1.1,
            liveness_weighting: 1.1,
            valence_weighting: 1.1,
            tempo_weighting: 1.1
          }
        )
      })
    })
    test('returns 201 and updated user when only one field is updated', ()=> {
      return request(app)
      .patch('/api/users/1')
      .send({
        popularity_weighting: 1
      })
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toMatchObject(
          {
            user_id: 1,
            username: 'Rob',
            popularity_weighting: 2,
            danceability_weighting: 1,
            energy_weighting: 1,
            acousticness_weighting: 1,
            instrumentalness_weighting: 1,
            liveness_weighting: 1,
            valence_weighting: 1,
            tempo_weighting: 1
          }
        )
      })
    })
  })