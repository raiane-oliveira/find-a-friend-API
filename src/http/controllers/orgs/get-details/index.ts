import { makeGetOrgDetails } from '@/use-cases/@factories/orgs/make-get-org-details'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getDetails(request: FastifyRequest, reply: FastifyReply) {
  const getOrgDetailsParams = z.object({
    orgId: z.string().uuid(),
  })

  const { orgId } = getOrgDetailsParams.parse(request.params)

  try {
    const getOrgDetailsUseCase = makeGetOrgDetails()

    const { org } = await getOrgDetailsUseCase.execute({
      orgId,
    })

    return reply.status(200).send({
      org: {
        ...org,
        password_hash: undefined,
      },
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    throw err
  }
}
