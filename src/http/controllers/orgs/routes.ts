import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refreshAuth } from './refresh-auth'
import { getDetails } from './get-details'

export async function orgsRoutes(app: FastifyInstance) {
  app.get('/orgs/:orgId', getDetails)

  app.post('/orgs', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refreshAuth)
}
