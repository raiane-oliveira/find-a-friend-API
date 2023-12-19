import { beforeEach, describe, expect, it } from 'vitest'
import { CreateAdoptionRequirementsUseCase } from '.'
import { InMemoryAdoptionRequirementsRepository } from '@/repositories/in-memory/in-memory-adoption-requirements-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository
let sut: CreateAdoptionRequirementsUseCase

describe('Create Adoption Requirements Use Case', () => {
  beforeEach(() => {
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository()
    sut = new CreateAdoptionRequirementsUseCase(adoptionRequirementsRepository)
  })

  it('should be able to create multiples adoption requirements for a pet', async () => {
    await sut.execute({
      requirement: 'Big environment',
      petId: 'pet-01',
    })

    await sut.execute({
      requirement: 'Cold environment',
      petId: 'pet-01',
    })

    expect(adoptionRequirementsRepository.items).toHaveLength(2)
    expect(adoptionRequirementsRepository.items).toEqual([
      expect.objectContaining({
        requirement: 'Big environment',
      }),
      expect.objectContaining({
        requirement: 'Cold environment',
      }),
    ])
  })

  it('should not be able to create an adoption requirement without requirement', async () => {
    await expect(() =>
      sut.execute({
        requirement: '',
        petId: 'pet-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
