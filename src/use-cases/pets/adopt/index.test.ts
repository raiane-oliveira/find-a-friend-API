import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { AdoptUseCase } from '.'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: AdoptUseCase

describe('Adopt Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new AdoptUseCase(petsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to adopt a pet', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0))

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
      city: 'Hello',
      state: 'JS',
    })

    const { pet } = await sut.execute({ petId: 'pet-01' })

    expect(pet.adopted_at).toEqual(expect.any(Date))
  })
})
