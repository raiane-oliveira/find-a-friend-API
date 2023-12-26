import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server).post('/orgs').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
    address: 'Rua do JavaScript',
    cep: '123456',
    whatsapp: '21988432312',
    city: 'Campina Grande',
    state: 'PB',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
