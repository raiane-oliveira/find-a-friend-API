import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from '.'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
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
    })

    const { pet } = await sut.execute({ petId: 'pet-01' })

    expect(pet.name).toEqual('Alfredo')
  })
})
