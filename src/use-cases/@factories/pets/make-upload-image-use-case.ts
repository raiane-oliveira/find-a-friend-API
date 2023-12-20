import { PrismaImagesRepository } from '@/repositories/prisma/prisma-images-repository'
import { UploadImageUseCase } from '@/use-cases/pets/upload-image'

export function makeUploadImageUseCase() {
  const imagesRepository = new PrismaImagesRepository()
  const useCase = new UploadImageUseCase(imagesRepository)

  return useCase
}
