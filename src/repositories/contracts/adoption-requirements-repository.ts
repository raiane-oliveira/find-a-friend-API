import { AdoptionRequirement } from '@prisma/client'

export interface AdoptionRequirementCreateInput {
  id?: number
  requirement: string
  pet_id: string
}

export interface AdoptionRequirementsRepository {
  create(data: AdoptionRequirementCreateInput): Promise<AdoptionRequirement>
}
