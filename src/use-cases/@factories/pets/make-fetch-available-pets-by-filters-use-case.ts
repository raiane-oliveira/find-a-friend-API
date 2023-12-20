import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchAvailablePetsByFiltersUseCase } from '@/use-cases/pets/fetch-available-pets-by-filters'

export function makeFetchAvailablePetsByFiltersUseCase() {
  const repository = new PrismaPetsRepository()
  const useCase = new FetchAvailablePetsByFiltersUseCase(repository)

  return useCase
}
