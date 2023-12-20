import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '@/use-cases/pets/create-pet'

export function makeCreatePetUseCase() {
  const repository = new PrismaPetsRepository()
  const useCase = new CreatePetUseCase(repository)

  return useCase
}
