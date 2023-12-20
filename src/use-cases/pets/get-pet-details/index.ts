import { AdoptionRequirementsRepository } from '@/repositories/contracts/adoption-requirements-repository'
import { ImagesRepository } from '@/repositories/contracts/images-repository'
import { PetsRepository } from '@/repositories/contracts/pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface GetPetDetailsUseCaseRequest {
  petId: string
}

export class GetPetDetailsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private imagesRepository: ImagesRepository,
    private adoptionRequirementsRepository: AdoptionRequirementsRepository,
  ) {}

  async execute({ petId }: GetPetDetailsUseCaseRequest) {
    const petDetails = await this.petsRepository.findById(petId)

    if (!petDetails) {
      throw new ResourceNotFoundError()
    }

    const petImages = await this.imagesRepository.findManyByPetId(petId)
    const petAdoptionRequirements =
      await this.adoptionRequirementsRepository.findManyByPetId(petId)

    const pet = {
      ...petDetails,
      images: petImages,
      requirements: petAdoptionRequirements,
    }

    return {
      pet,
    }
  }
}
