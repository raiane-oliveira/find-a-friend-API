import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Get Details Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
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

    const pet = await prisma.pet.findFirstOrThrow()

    const response = await request(app.server)
      .get(`/pets/${pet.id}/details`)
      .expect(200)

    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Alfredo',
      }),
    )
  })
})
