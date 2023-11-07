const request=require('supertest')
const {
  app
}=require('../app.js')
const seed = require('../db/seeds/seed')
const { songData, userData } = require('../db/data/test/stringify.js')
const db = require('../db/connection.js')


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
      .then(({body}) => {
        expect(body.songs).toHaveLength(10)
      }) })
  })

  test("returns the correct songs", () => {
    return request(app)
    .get("/api/songs")
    .expect(200)
    .then(({body}) => {
      expect(body.songs[0].title).toBe("I'll Be Missing You")
      expect(body.songs[0].artist).toBe("Puff Daddy")
      expect(body.songs[0].popularity).toBe(74)
      expect(body.songs[0].danceability).toBe(0.684)
      expect(body.songs[0].energy).toBe(0.376)
      expect(body.songs[0].loudness).toBe(-10.934)
      expect(body.songs[0].acousticness).toBe(0.0884)
      expect(body.songs[0].instrumentalness).toBe(0)
      expect(body.songs[0].liveness).toBe(0.135)
      expect(body.songs[0].valence).toBe(0.693)
      expect(body.songs[0].tempo).toBe(109.997)
  
    })

    



})