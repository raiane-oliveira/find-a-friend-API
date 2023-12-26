import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'

describe('Create pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Alfredo',
        about: 'Lorem ipsum',
        age: 1,
        energy: 5,
        environment: 'HIGH',
        independence: 'MEDIUM',
        size: 'XS',
        city: 'Campinas',
        state: 'Ipsum',
      })
      .expect(201)
  })
})
