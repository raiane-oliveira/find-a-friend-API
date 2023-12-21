import { makeGetPetDetailsUseCase } from '@/use-cases/@factories/pets/make-get-pet-details-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getDetailsPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getDetailsPetParamsSchema = z.object({
    petId: z.string().uuid(),
  })
  const { petId } = getDetailsPetParamsSchema.parse(request.params)

  try {
    const getDetailsPetUseCase = makeGetPetDetailsUseCase()
    const { pet } = await getDetailsPetUseCase.execute({ petId })

    return reply.status(200).send({
      pet,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
