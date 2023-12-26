import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate org', async () => {
    await request(app.server).post('/orgs').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Rua do JavaScript',
      cep: '123456',
      whatsapp: '(21) 9 8843-2312',
      city: 'Campina Grande',
      state: 'PB',
    })

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'johndoe@example.com',
        password: '123456',
      })
      .expect(200)

    expect(response.body.token).toBeDefined()
  })
})
