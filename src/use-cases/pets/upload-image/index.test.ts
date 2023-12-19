import { beforeEach, describe, expect, it } from 'vitest'
import { UploadImageUseCase } from '.'
import { InMemoryImagesRepository } from '@/repositories/in-memory/in-memory-images-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

let imagesRepository: InMemoryImagesRepository
let sut: UploadImageUseCase

describe('Upload Image Use Case', () => {
  beforeEach(() => {
    imagesRepository = new InMemoryImagesRepository()
    sut = new UploadImageUseCase(imagesRepository)
  })

  it('should be able to upload a image', async () => {
    const { image } = await sut.execute({
      url: 'http://localhost:3333/image-test.jpg',
      petId: 'pet-01',
    })

    expect(image.url).toEqual('http://localhost:3333/image-test.jpg')
  })

  it('should not be able to upload a image without url', async () => {
    await expect(() =>
      sut.execute({
        url: '',
        petId: 'pet-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
