import { makeUploadImageUseCase } from '@/use-cases/@factories/pets/make-upload-image-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function uploadImage(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const uploadImageBodySchema = z.object({
    url: z.string().url(),
    alt: z.string().refine((value) => !value || value),
  })

  const uploadImageParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { alt, url } = uploadImageBodySchema.parse(request.body)
  const { petId } = uploadImageParamsSchema.parse(request.params)

  try {
    const uploadImageUseCase = makeUploadImageUseCase()

    await uploadImageUseCase.execute({ url, alt, petId })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
