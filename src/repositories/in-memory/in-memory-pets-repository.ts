import { Pet } from '@prisma/client'
import { PetCreateInput, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: PetCreateInput) {
    const pet: Pet = {
      id: data.id ? data.id : randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      energy: data.energy,
      environment: data.environment,
      independent_level: data.independent_level,
      size: data.size,
      org_id: data.org_id ? data.org_id : randomUUID(),
      created_at: new Date(),
    }

    this.items.push(pet)
    return pet
  }
}
