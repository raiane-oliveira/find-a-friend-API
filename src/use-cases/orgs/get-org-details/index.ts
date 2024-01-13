import { OrgsRepository } from '@/repositories/contracts/orgs-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface GetOrgDetailsUseCaseRequest {
  orgId: string
}

export class GetOrgDetailsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ orgId }: GetOrgDetailsUseCaseRequest) {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return {
      org,
    }
  }
}
