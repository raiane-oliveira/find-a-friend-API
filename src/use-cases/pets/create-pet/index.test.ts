import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from '.'
import { InvalidPetEnergyError } from '@/use-cases/errors/invalid-pet-energy-error'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Alfredo',
      about: 'Lorem ipsum',
      age: 0,
      energy: 5,
      environment: 'HIGH',
      independentLevel: 'MEDIUM',
      size: 'XS',
      orgId: 'org-01',
    })

    expect(pet.name).toEqual('Alfredo')
  })

  it('should not be able to create a pet with invalid energy level', async () => {
    await expect(() =>
      sut.execute({
        name: 'Alfredo',
        about: 'Lorem ipsum',
        age: 0,
        energy: 6,
        environment: 'HIGH',
        independentLevel: 'MEDIUM',
        size: 'XS',
        orgId: 'org-01',
      }),
    ).rejects.toBeInstanceOf(InvalidPetEnergyError)
  })
})
