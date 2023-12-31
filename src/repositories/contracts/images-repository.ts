import { Image, Prisma } from '@prisma/client'

export interface ImageCreateInput extends Omit<Prisma.ImageCreateInput, 'pet'> {
  pet_id: string
}

export interface ImagesRepository {
  create(data: ImageCreateInput): Promise<Image>
  findManyByPetId(petId: string): Promise<Image[]>
}
