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
      .then(({body: { songs }}) => {
        expect(songs).toHaveLength(7)
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

  })

