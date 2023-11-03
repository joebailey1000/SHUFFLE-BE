const request=require('supertest')
const {
  app,
  server
}=require('../app')

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