import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetDetailsUseCase } from '../../pets/get-pet-details'
import { PrismaImagesRepository } from '@/repositories/prisma/prisma-images-repository'
import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoption-requirements-repository'

export function makeGetPetDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const imagesRepository = new PrismaImagesRepository()
  const requirementsRepository = new PrismaAdoptionRequirementsRepository()
  const useCase = new GetPetDetailsUseCase(
    petsRepository,
    imagesRepository,
    requirementsRepository,
  )

  return useCase
}
