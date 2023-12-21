import { makeCreatePetUseCase } from '@/use-cases/@factories/pets/make-create-pet-use-case'
import { InvalidPetEnergyError } from '@/use-cases/errors/invalid-pet-energy-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.coerce.number(),
    size: z.enum(['XS', 'S', 'M', 'L', 'XL']),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    environment: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    energy: z.coerce.number().min(1).max(5),
    city: z.string(),
    state: z.string(),
  })

  const { independence, ...petData } = createPetBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()
    const orgId = request.user.sub

    await createPetUseCase.execute({
      ...petData,
      independentLevel: independence,
      orgId,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof InvalidPetEnergyError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
