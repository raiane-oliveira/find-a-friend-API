import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchAvailablePetsByFiltersUseCase } from '.'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { Pet } from '@prisma/client'

let petsRepository: InMemoryPetsRepository
let sut: FetchAvailablePetsByFiltersUseCase

describe('Fetch Available Pets By City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchAvailablePetsByFiltersUseCase(petsRepository)
  })

  it('should be able to fetch available pets by city', async () => {
    const petMockup: Omit<Omit<Omit<Pet, 'id'>, 'city'>, 'state'> = {
      name: 'Alfredo',
      about: 'Lorem ipsum',
      age: 0,
      energy: 5,
      environment: 'HIGH',
      independence: 'MEDIUM',
      size: 'XS',
      org_id: 'org-01',
      adopted_at: null,
      created_at: new Date(),
    }

    await petsRepository.create({
      id: 'pet-01',
      city: 'Campina Grande',
      state: 'Paraíba',
      ...petMockup,
    })

    await petsRepository.create({
      id: 'pet-02',
      city: 'Campina Grande',
      state: 'Paraíba',
      ...petMockup,
    })

    await petsRepository.create({
      id: 'pet-03',
      city: 'João Pessoa',
      state: 'Paraíba',
      ...petMockup,
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
      independence: 'MEDIUM',
      size: 'XS',
      org_id: 'org-01',
      city: 'Campina Grande',
      state: 'Paraíba',
    })

    await expect(() => sut.execute({ city: '' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it('should not be able to fetch adopted pets', async () => {
    await petsRepository.create({
      id: 'pet-01',
      name: 'Alfredo',
      about: 'Lorem ipsum',
      age: 0,
      energy: 5,
      environment: 'HIGH',
      independence: 'MEDIUM',
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
      independence: 'MEDIUM',
      size: 'XS',
      org_id: 'org-01',
      city: 'Campina Grande',
      state: 'Paraíba',
      adopted_at: new Date(),
    })

    const { pets } = await sut.execute({ city: 'Campina Grande' })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ id: 'pet-01' })])
  })

  it('should be able to fetch pets by age', async () => {
    await petsRepository.create({
      id: 'pet-01',
      name: 'Alfredo',
      about: 'Lorem ipsum',
      age: 1,
      energy: 5,
      environment: 'HIGH',
      independence: 'MEDIUM',
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
      independence: 'MEDIUM',
      size: 'XS',
      org_id: 'org-01',
      city: 'Campina Grande',
      state: 'Paraíba',
    })

    const { pets } = await sut.execute({ city: 'Campina Grande', age: 1 })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ id: 'pet-01' })])
  })

  it('should be able to fetch pets by energy, size and independence', async () => {
    await petsRepository.create({
      id: 'pet-01',
      name: 'Alfredo',
      about: 'Lorem ipsum',
      age: 1,
      energy: 5,
      environment: 'HIGH',
      independence: 'MEDIUM',
      size: 'XS',
      org_id: 'org-01',
      city: 'Campina Grande',
      state: 'Paraíba',
    })

    await petsRepository.create({
      id: 'pet-02',
      name: 'Alfredo',
      about: 'Lorem ipsum',
      age: 1,
      energy: 5,
      environment: 'HIGH',
      independence: 'MEDIUM',
      size: 'XS',
      org_id: 'org-01',
      city: 'Campina Grande',
      state: 'Paraíba',
    })

    await petsRepository.create({
      id: 'pet-03',
      name: 'Alfredo',
      about: 'Lorem ipsum',
      age: 1,
      energy: 5,
      environment: 'HIGH',
      independence: 'MEDIUM',
      size: 'M',
      org_id: 'org-01',
      city: 'Campina Grande',
      state: 'Paraíba',
    })

    const { pets } = await sut.execute({
      city: 'Campina Grande',
      age: 1,
      energy: 5,
      independence: 'MEDIUM',
      size: 'XS',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ id: 'pet-01' }),
      expect.objectContaining({ id: 'pet-02' }),
    ])
  })
})
