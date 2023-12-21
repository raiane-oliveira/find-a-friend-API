import { makeRegisterUseCase } from '@/use-cases/@factories/orgs/make-register-use-case'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
    address: z.string(),
    cep: z.string(),
    whatsapp: z.string(),
    city: z.string(),
    state: z.string(),
  })

  const { name, email, password, address, cep, whatsapp, city, state } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      address,
      cep,
      whatsapp,
      city,
      state,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
