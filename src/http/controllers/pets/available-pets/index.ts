import { makeFetchAvailablePetsByFiltersUseCase } from '@/use-cases/@factories/pets/make-fetch-available-pets-by-filters-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { Level } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function availablePets(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const availablePetsQuerySchema = z.object({
    city: z.string(),
    age: z.coerce.number().refine((value) => !value || value),
    energy: z.coerce.number().refine((value) => !value || value),
    size: z
      .enum(['XS', 'L', 'M', 'S', 'XL'])
      .refine((value) => !value || value),
    independence: z.nativeEnum(Level).refine((value) => !value || value),
  })

  const { city, age, energy, size, independence } =
    availablePetsQuerySchema.parse(request.query)

  try {
    const availablePetsUseCase = makeFetchAvailablePetsByFiltersUseCase()

    const { pets } = await availablePetsUseCase.execute({
      city,
      age,
      energy,
      size,
      independence,
    })

    return reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
