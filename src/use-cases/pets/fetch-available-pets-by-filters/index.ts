import { PetsRepository } from '@/repositories/contracts/pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { Level, Size } from '@prisma/client'

interface FetchAvailablePetsByFiltersUseCaseRequest {
  city: string
  age?: number
  size?: Size
  energy?: number
  independence?: Level
}

export class FetchAvailablePetsByFiltersUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energy,
    independence,
    size,
  }: FetchAvailablePetsByFiltersUseCaseRequest) {
    if (!city) {
      throw new ResourceNotFoundError()
    }

    const pets = await this.petsRepository.findManyByFilters({
      city,
      age,
      energy,
      independence,
      size,
    })

    return {
      pets,
    }
  }
}
