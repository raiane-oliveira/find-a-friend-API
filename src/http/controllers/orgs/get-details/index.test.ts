import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Get Org Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get org details', async () => {
    const { id } = await prisma.org.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash: '432423',
        address: 'John Doe address',
        cep: '123554',
        city: 'Campinas',
        state: 'São Paulo',
        whatsapp: '3432432432',
      },
    })

    const response = await request(app.server).get(`/orgs/${id}`).expect(200)

    expect(response.body.org).toEqual(
      expect.objectContaining({
        name: 'John Doe',
      }),
    )

    expect(response.body.org).toEqual(
      expect.not.objectContaining({
        password_hash: '432423',
      }),
    )
  })
})
