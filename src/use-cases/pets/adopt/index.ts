import { PetsRepository } from '@/repositories/contracts/pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface AdoptUseCaseRequest {
  petId: string
}

export class AdoptUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ petId }: AdoptUseCaseRequest) {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    pet.adopted_at = new Date()
    await this.petsRepository.save(pet)

    return {
      pet,
    }
  }
}
