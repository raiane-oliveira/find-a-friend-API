import { prisma } from '@/lib/prisma'
import {
  AdoptionRequirementCreateInput,
  AdoptionRequirementsRepository,
} from '../contracts/adoption-requirements-repository'

export class PrismaAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  async create(data: AdoptionRequirementCreateInput) {
    const adoptionRequirement = await prisma.adoptionRequirement.create({
      data,
    })

    return adoptionRequirement
  }

  async findManyByPetId(petId: string) {
    const adoptionRequirements = await prisma.adoptionRequirement.findMany({
      where: {
        pet_id: petId,
      },
    })

    return adoptionRequirements
  }
}
