const request=require('supertest')
const {
  app,
  server
}=require('../app.js')
const seed = require('../db/seeds/seed')
const { songData, userData } = require('../db/data/test/stringify.js')


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



describe.only("GET /api/songs", () => {
  test("returns 200", () => {
    return request(app)
      .get("/api/songs")
      .expect(200)
      .then(( body ) => {
        console.log(body)
        expect(body).toHaveLength(7);
      })
  })})