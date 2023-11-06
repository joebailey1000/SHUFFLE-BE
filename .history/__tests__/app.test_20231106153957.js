const request=require('supertest')
// const {
//   app,
//   server
// }=require('../app.js')
const seed = require('../db/seeds/seed')
const { songData, userData } = require('../db/data/test/stringify.js')
const db = require('../db/connection')


beforeEach(()=> {
  seed({songData, userData})
})

afterAll(()=>{
  db.end()
  server.close()
})

describe('GET /healthcheck',()=>{
  test('returns 200',()=>{
    return request(app)
      .get('/healthcheck')
      .expect(200)
  })
})



describe.only("GET /api/songs", () => {
  test("returns 200", () => {
    return request(app)
      .get("/api/songs")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(7);
        expect(body[0]).toHaveProperty("song_id");
        expect(body[0]).toHaveProperty("title");
        expect(body[0]).toHaveProperty("artist");
        expect(body[0]).toHaveProperty("modernity");
        expect(body[0]).toHaveProperty("popularity");
        expect(body[0]).toHaveProperty("danceability");
        expect(body[0]).toHaveProperty("energy");
        expect(body[0]).toHaveProperty("loudness");
        expect(body[0]).toHaveProperty("acousticness");
        expect(body[0]).toHaveProperty("instrumentalness");
        expect(body[0]).toHaveProperty("liveness");
        expect(body[0]).toHaveProperty("valence");
        expect(body[0]).toHaveProperty("tempo");

      })
  })})