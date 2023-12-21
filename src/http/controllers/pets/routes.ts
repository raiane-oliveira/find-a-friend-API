import { FastifyInstance } from 'fastify'
import { createPet } from './create-pet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getDetailsPet } from './get-details-pet'
import { adopt } from './adopt'
import { createAdoptionRequirement } from './create-adoption-requirement'
import { availablePets } from './available-pets'
import { uploadImage } from './upload-image'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId/details', getDetailsPet)
  app.get('/pets/available', availablePets)

  app.patch('/pets/:petId/adopt', { onRequest: [verifyJWT] }, adopt)

  app.post('/pets', { onRequest: [verifyJWT] }, createPet)
  app.post(
    '/pets/:petId/requirements',
    { onRequest: [verifyJWT] },
    createAdoptionRequirement,
  )
  app.post('/pets/:petId/upload-image', { onRequest: [verifyJWT] }, uploadImage)
}
