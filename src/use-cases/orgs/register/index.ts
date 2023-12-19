import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../../errors/org-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  address: string
  cep: number
  whatsapp: number
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    cep,
    address,
    whatsapp,
  }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      address,
      cep,
      password_hash,
      email,
      whatsapp,
    })

    return {
      org,
    }
  }
}
