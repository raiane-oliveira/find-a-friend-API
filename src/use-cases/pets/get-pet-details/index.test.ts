import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from '.'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryImagesRepository } from '@/repositories/in-memory/in-memory-images-repository'
import { InMemoryAdoptionRequirementsRepository } from '@/repositories/in-memory/in-memory-adoption-requirements-repository'

let petsRepository: InMemoryPetsRepository
let imagesRepository: InMemoryImagesRepository
let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    imagesRepository = new InMemoryImagesRepository()
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository()
    sut = new GetPetDetailsUseCase(
      petsRepository,
      imagesRepository,
      adoptionRequirementsRepository,
    )
  })

  it('should be able to get pet details', async () => {
    await petsRepository.create({
      id: 'pet-01',
      name: 'Alfredo',
      about: 'Lorem ipsum',
      age: 0,
      energy: 5,
      environment: 'HIGH',
      independent_level: 'MEDIUM',
      size: 'XS',
      org_id: 'org-01',
      city: 'Lorem',
      state: 'Ipsum',
    })

    const { pet } = await sut.execute({ petId: 'pet-01' })

    expect(pet.name).toEqual('Alfredo')
    expect(pet.images).toBeDefined()
    expect(pet.requirements).toBeDefined()
  })
})
