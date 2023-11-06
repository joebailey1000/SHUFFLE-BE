const request=require('supertest')
const {
  app,
  server
}=require('../app.js')
const seed = require('../db/seeds/seed')
const songData = require('../db/data/test/songs-test.json')
const userData = require('../db/data/test/users-test.json')


beforeEach(()=> {
  seed({songData, userData})
})

afterAll(()=>{
  server.close()
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
      .then(({ body }) => {
        console.log(body)
        expect(body.songs).toHaveLength(3);
      })
  })})