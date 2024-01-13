import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetOrgDetailsUseCase } from '@/use-cases/orgs/get-org-details'

export function makeGetOrgDetails() {
  const repository = new PrismaOrgsRepository()
  const useCase = new GetOrgDetailsUseCase(repository)

  return useCase
}
