import { FastifyReply, FastifyRequest } from 'fastify'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({ message: 'hello' })
}
