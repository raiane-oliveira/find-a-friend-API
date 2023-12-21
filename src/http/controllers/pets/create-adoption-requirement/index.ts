import { makeCreateAdoptionRequirementUseCase } from '@/use-cases/@factories/pets/make-create-adoption-requirement-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createAdoptionRequirement(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createAdoptionRequirementBodySchema = z.object({
    requirement: z.string(),
  })

  const createAdoptionRequirementParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { requirement } = createAdoptionRequirementBodySchema.parse(
    request.body,
  )
  const { petId } = createAdoptionRequirementParamsSchema.parse(request.params)

  try {
    const createAdoptionRequirementUseCase =
      makeCreateAdoptionRequirementUseCase()

    await createAdoptionRequirementUseCase.execute({ petId, requirement })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
