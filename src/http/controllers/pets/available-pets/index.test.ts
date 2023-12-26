import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Available Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list available pet for adoption by city', async () => {
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Alex',
        about: 'Lorem ipsum',
        age: 0,
        energy: 5,
        environment: 'LOW',
        independence: 'HIGH',
        size: 'XS',
        city: 'Campinass',
        state: 'Ipsum',
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Alendor',
        about: 'Lorem ipsum',
        age: 1,
        energy: 4,
        environment: 'LOW',
        independence: 'MEDIUM',
        size: 'S',
        city: 'Campinas',
        state: 'Ipsum',
      })

    const response = await request(app.server)
      .get(`/pets/available?city=Campinas`)
      .expect(200)

    expect(response.body.pets).toHaveLength(2)
    expect(response.body).toEqual({
      pets: [
        expect.objectContaining({
          name: 'Alfredo',
        }),
        expect.objectContaining({
          name: 'Alendor',
        }),
      ],
    })
  })

  it('should be able to fetch by size', async () => {
    const response = await request(app.server)
      .get('/pets/available')
      .query({
        city: 'Campinas',
        size: 'S',
      })
      .expect(200)

    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Alendor',
      }),
    ])
  })

  it('should be able to fetch by independence', async () => {
    const response = await request(app.server)
      .get('/pets/available')
      .query({
        city: 'Campinas',
        independence: 'MEDIUM',
      })
      .expect(200)

    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Alfredo',
      }),
      expect.objectContaining({
        name: 'Alendor',
      }),
    ])
  })

  it('should be able to fetch by energy', async () => {
    const response = await request(app.server)
      .get('/pets/available')
      .query({
        city: 'Campinas',
        energy: 4,
      })
      .expect(200)

    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Alendor',
      }),
    ])
  })

  it('should be able to fetch by age', async () => {
    const response = await request(app.server)
      .get('/pets/available')
      .query({
        city: 'Campinas',
        age: 1,
      })
      .expect(200)

    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Alfredo',
      }),
      expect.objectContaining({
        name: 'Alendor',
      }),
    ])
  })
})
