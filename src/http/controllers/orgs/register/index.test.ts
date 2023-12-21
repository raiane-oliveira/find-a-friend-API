import { app } from '@/app'
import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    await request(app.server)
      .post('/orgs')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        address: 'Rua do JavaScript',
        cep: '123456',
        whatsapp: '(21) 9 8843-2312',
        city: 'Campina Grande',
        state: 'PB',
      })
      .expect(201)
  })

  it('should not be able to register with same email twice', async () => {
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

    await request(app.server)
      .post('/orgs')
      .send({
        name: 'John Doe 2',
        email: 'johndoe@example.com',
        password: '123456',
        address: 'Rua do JavaScript',
        cep: '123456',
        whatsapp: '(21) 9 8843-2312',
        city: 'Campina Grande',
        state: 'PB',
      })
      .expect(409)
  })
})
