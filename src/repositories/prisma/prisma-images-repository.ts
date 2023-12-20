import { prisma } from '@/lib/prisma'
import {
  ImageCreateInput,
  ImagesRepository,
} from '../contracts/images-repository'

export class PrismaImagesRepository implements ImagesRepository {
  async create(data: ImageCreateInput) {
    const image = await prisma.image.create({
      data,
    })

    return image
  }

  async findManyByPetId(petId: string) {
    const images = await prisma.image.findMany({
      where: {
        pet_id: petId,
      },
    })

    return images
  }
}
