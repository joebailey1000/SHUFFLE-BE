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

  test("returns the correct song titles", () => {
    return request(app)
    .get("/api/songs")
    .expect(200)
    .then(({body}) => {
      expect(body.songs[0].title).toBe("Song A")
      expect(body.songs[1].title).toBe("Song B")
      expect(body.songs[2].title).toBe("Song C")
      expect(body.songs[3].title).toBe("Song D")
      expect(body.songs[4].title).toBe("Song E")
      expect(body.songs[5].title).toBe("Song F")
      expect(body.songs[6].title).toBe("Song G")

    })





})