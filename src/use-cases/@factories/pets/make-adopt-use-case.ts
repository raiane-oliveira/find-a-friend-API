import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { AdoptUseCase } from '../../pets/adopt'

export function makeAdoptUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new AdoptUseCase(petsRepository)

  return useCase
}
