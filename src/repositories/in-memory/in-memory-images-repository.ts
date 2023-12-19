import { Image } from '@prisma/client'
import {
  ImageCreateInput,
  ImagesRepository,
} from '../contracts/images-repository'
import { randomInt } from 'crypto'

export class InMemoryImagesRepository implements ImagesRepository {
  public items: Image[] = []

  async create(data: ImageCreateInput) {
    const image: Image = {
      id: randomInt(100),
      url: data.url,
      alt: data.alt ?? null,
      pet_id: data.pet_id,
    }

    return image
  }
}
