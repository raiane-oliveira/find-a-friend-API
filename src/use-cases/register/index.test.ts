import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from '.'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../errors/org-already-exists'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Rua do Limoeiro, 453, PB - Campina Grande',
      cep: 123456,
      whatsapp: 21984342375,
    })

    expect(org.name).toEqual('John Doe')
  })

  it('should be able to hash password', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Rua do Limoeiro, 453, PB - Campina Grande',
      cep: 123456,
      whatsapp: 21984342375,
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Rua do Limoeiro, 453, PB - Campina Grande',
      cep: 123456,
      whatsapp: 21984342375,
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        address: 'Rua do Limoeiro, 453, PB - Campina Grande',
        cep: 123456,
        whatsapp: 21984342375,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})