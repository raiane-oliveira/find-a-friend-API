import { ImagesRepository } from '@/repositories/images-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface UploadImageUseCaseRequest {
  url: string
  alt?: string
  petId: string
}

export class UploadImageUseCase {
  constructor(private imagesRepository: ImagesRepository) {}

  async execute({ url, alt, petId }: UploadImageUseCaseRequest) {
    if (!url) {
      throw new ResourceNotFoundError()
    }

    const image = await this.imagesRepository.create({
      url,
      alt,
      pet_id: petId,
    })

    return {
      image,
    }
  }
}
