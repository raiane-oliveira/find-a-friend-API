import { AdoptionRequirement } from '@prisma/client'
import {
  AdoptionRequirementsRepository,
  AdoptionRequirementCreateInput,
} from '../adoption-requirements-repository'
import { randomInt, randomUUID } from 'crypto'

export class InMemoryAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  public items: AdoptionRequirement[] = []

  async create(data: AdoptionRequirementCreateInput) {
    const adoptionRequirements: AdoptionRequirement = {
      id: randomInt(100),
      requirement: data.requirement,
      pet_id: randomUUID(),
    }

    this.items.push(adoptionRequirements)
    return adoptionRequirements
  }
}
