import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetOrgDetailsUseCase } from '.'
import { describe, it, beforeEach, expect } from 'vitest'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgDetailsUseCase

describe('Get Org Details Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgDetailsUseCase(orgsRepository)
  })

  it('should be able to get org details', async () => {
    await orgsRepository.create({
      id: '01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '432423',
      address: 'John Doe address',
      cep: '123554',
      city: 'Campinas',
      state: 'São Paulo',
      whatsapp: '3432432432',
    })

    const { org } = await sut.execute({ orgId: '01' })

    expect(org.id).toEqual('01')
  })
})
