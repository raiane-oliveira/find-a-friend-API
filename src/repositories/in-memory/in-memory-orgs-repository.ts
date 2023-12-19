import { Organization, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const org: Organization = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      cep: data.cep,
      whatsapp: data.whatsapp,
      created_at: new Date(),
    }

    this.items.push(org)
    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
