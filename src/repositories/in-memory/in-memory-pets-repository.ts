import { Pet } from '@prisma/client'
import {
  Filters,
  PetCreateInput,
  PetsRepository,
} from '../contracts/pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: PetCreateInput) {
    const pet: Pet = {
      ...data,
      id: data.id ? data.id : randomUUID(),
      org_id: data.org_id ?? randomUUID(),
      created_at: new Date(),
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
    }

    this.items.push(pet)
    return pet
  }

  async save(pet: Pet) {
    const petIndex = this.items.findIndex((item) => item.id === pet.id)

    if (petIndex >= 0) {
      this.items[petIndex] = pet
    }

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByFilters({ city, age, energy, independence, size }: Filters) {
    const pets = this.items.filter((item) => {
      const filterByCity =
        item.city.toLowerCase().trim() === city.toLowerCase().trim() &&
        !item.adopted_at

      const filterByAge = age ? item.age === age : true
      const filterByEnergy = energy ? item.energy === energy : true
      const filterBySize = size ? item.size === size : true
      const filterByIndependence = independence
        ? item.independent_level === independence
        : true

      return (
        filterByCity &&
        filterByAge &&
        filterByEnergy &&
        filterBySize &&
        filterByIndependence
      )
    })

    if (pets.length === 0) {
      return null
    }

    return pets
  }
}
