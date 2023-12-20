import { Level, Pet, Prisma, Size } from '@prisma/client'

type _OmitOrganizationFromPetCreateInput = Omit<
  Prisma.PetCreateInput,
  'organization'
>
type _OmitImageFromPetCreateInput = Omit<
  _OmitOrganizationFromPetCreateInput,
  'Image'
>

export interface PetCreateInput
  extends Omit<_OmitImageFromPetCreateInput, 'AdoptionRequirement'> {
  org_id: string
}

export interface Filters {
  city: string
  age?: number
  energy?: number
  size?: Size
  independence?: Level
}

export interface PetsRepository {
  create(data: PetCreateInput): Promise<Pet>
  save(pet: Pet): Promise<PetCreateInput>
  findById(id: string): Promise<Pet | null>
  findManyByFilters(filters: Filters): Promise<Pet[] | null>
}
