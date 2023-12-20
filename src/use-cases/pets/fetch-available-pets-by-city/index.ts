import { PetsRepository } from '@/repositories/contracts/pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface FetchAvailablePetsByCityUseCaseRequest {
  city: string
}

export class FetchAvailablePetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city }: FetchAvailablePetsByCityUseCaseRequest) {
    if (!city) {
      throw new ResourceNotFoundError()
    }

    const pets = await this.petsRepository.findManyByCity(city)

    return {
      pets,
    }
  }
}
