import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateUseCase } from '@/use-cases/orgs/authenticate'

export function makeAuthenticateUseCase() {
  const repository = new PrismaOrgsRepository()
  const useCase = new AuthenticateUseCase(repository)

  return useCase
}
