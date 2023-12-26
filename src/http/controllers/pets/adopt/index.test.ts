import { app } from '@/app'
import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Adopt pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to adopt pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Alfredo',
        about: 'Lorem ipsum',
        age: 0,
        energy: 5,
        environment: 'HIGH',
        independence: 'MEDIUM',
        size: 'XS',
        city: 'Lorem',
        state: 'Ipsum',
      })

    const pet = await prisma.pet.findFirstOrThrow()

    await request(app.server)
      .patch(`/pets/${pet.id}/adopt`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })
})
