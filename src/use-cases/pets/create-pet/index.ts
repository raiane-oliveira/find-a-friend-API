import { PetsRepository } from '@/repositories/contracts/pets-repository'
import { InvalidPetEnergyError } from '@/use-cases/errors/invalid-pet-energy-error'
import { Level, Size } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: number
  size: Size
  energy: number
  independentLevel: Level
  environment: Level
  orgId: string
  city: string
  state: string
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energy,
    environment,
    independentLevel,
    orgId,
    city,
    state,
  }: CreatePetUseCaseRequest) {
    if (energy > 5) {
      throw new InvalidPetEnergyError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy,
      environment,
      city,
      state,
      independent_level: independentLevel,
      org_id: orgId,
    })

    return {
      pet,
    }
  }
}
