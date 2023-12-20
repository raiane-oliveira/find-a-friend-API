import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'

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
        cep: 123456,
        whatsapp: 21988432312,
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
      cep: 123456,
      whatsapp: 21988432312,
      city: 'Campina Grande',
      state: 'PB',
    })

    await expect(() =>
      request(app.server).post('/orgs').send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        address: 'Rua do JavaScript',
        cep: 123456,
        whatsapp: 21988432312,
        city: 'Campina Grande',
        state: 'PB',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
