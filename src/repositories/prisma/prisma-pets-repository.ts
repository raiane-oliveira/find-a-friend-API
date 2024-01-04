import { Pet } from '@prisma/client'
import {
  Filters,
  PetCreateInput,
  PetsRepository,
} from '../contracts/pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async save(data: Pet) {
    const pet = await prisma.pet.update({
      where: {
        id: data.id,
      },
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async findManyByFilters(filters: Filters) {
    const pets = await prisma.pet.findMany({
      where: {
        city: filters.city,
        age: filters.age,
        energy: filters.energy,
        independence: filters.independence,
        size: filters.size,
      },
      include: {
        Image: true,
        AdoptionRequirement: true,
      },
    })

    return pets
  }
}
