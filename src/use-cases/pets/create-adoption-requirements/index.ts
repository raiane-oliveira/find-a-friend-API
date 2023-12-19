import { AdoptionRequirementsRepository } from '@/repositories/contracts/adoption-requirements-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface CreateAdoptionRequirementsUseCaseRequest {
  requirement: string
  petId: string
}

export class CreateAdoptionRequirementsUseCase {
  constructor(
    private adoptionRequirementsRepository: AdoptionRequirementsRepository,
  ) {}

  async execute({
    requirement,
    petId,
  }: CreateAdoptionRequirementsUseCaseRequest) {
    if (!requirement) {
      throw new ResourceNotFoundError()
    }

    const adoptionRequirement =
      await this.adoptionRequirementsRepository.create({
        requirement,
        pet_id: petId,
      })

    return {
      adoptionRequirement,
    }
  }
}
