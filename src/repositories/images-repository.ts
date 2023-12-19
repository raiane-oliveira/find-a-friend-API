import { Image, Prisma } from '@prisma/client'

export interface ImageCreateInput extends Omit<Prisma.ImageCreateInput, 'pet'> {
  pet_id: string
}

export interface ImagesRepository {
  create(data: ImageCreateArgs): Promise<Image>
}
