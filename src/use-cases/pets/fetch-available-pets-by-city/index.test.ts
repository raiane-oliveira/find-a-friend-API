import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchAvailablePetsByCityUseCase } from '.'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: FetchAvailablePetsByCityUseCase

describe('Fetch Available Pets By City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchAvailablePetsByCityUseCase(petsRepository)
  })

  it('should be able to fetch available pets by city', async () => {
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
      city: 'Campina Grande',
      state: 'Paraíba',
    })

    await petsRepository.create({
      id: 'pet-02',
      name: 'Alfredo',
      about: 'Lorem ipsum',
      age: 0,
      energy: 5,
      environment: 'HIGH',
      independent_level: 'MEDIUM',
      size: 'XS',
      org_id: 'org-01',
      city: 'Campina Grande',
      state: 'Paraíba',
    })

    await petsRepository.create({
      id: 'pet-03',
      name: 'Alfredo',
      about: 'Lorem ipsum',
      age: 0,
      energy: 5,
      environment: 'HIGH',
      independent_level: 'MEDIUM',
      size: 'XS',
      org_id: 'org-01',
      city: 'João Pessoa',
      state: 'Paraíba',
    })

    const { pets } = await sut.execute({ city: 'Campina Grande' })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ id: 'pet-01' }),
      expect.objectContaining({ id: 'pet-02' }),
    ])
  })

  it('should not be able to fetch pets without city', async () => {
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
      city: 'Campina Grande',
      state: 'Paraíba',
    })

    await expect(() => sut.execute({ city: '' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
