import { OrgsRepository } from '@/repositories/contracts/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../../errors/org-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  address: string
  cep: number
  whatsapp: number
  city: string
  state: string
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
    city,
    state,
  }: RegisterUseCaseRequest) {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
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
      city,
      state,
    })

    return {
      org,
    }
  }
}
