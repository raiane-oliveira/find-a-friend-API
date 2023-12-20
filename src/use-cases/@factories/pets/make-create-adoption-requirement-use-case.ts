import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoption-requirements-repository'
import { CreateAdoptionRequirementsUseCase } from '@/use-cases/pets/create-adoption-requirements'

export function makeCreateAdoptionRequirementUseCase() {
  const repository = new PrismaAdoptionRequirementsRepository()
  const useCase = new CreateAdoptionRequirementsUseCase(repository)

  return useCase
}
