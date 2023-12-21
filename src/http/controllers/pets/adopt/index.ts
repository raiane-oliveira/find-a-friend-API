import { makeAdoptUseCase } from '@/use-cases/@factories/pets/make-adopt-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function adopt(request: FastifyRequest, reply: FastifyReply) {
  const adoptParamsSchema = z.object({
    petId: z.string().uuid(),
  })
  const { petId } = adoptParamsSchema.parse(request.params)

  try {
    const adoptUseCase = makeAdoptUseCase()
    await adoptUseCase.execute({ petId })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
