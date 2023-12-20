import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterUseCase } from '@/use-cases/orgs/register'

export function makeRegisterUseCase() {
  const repository = new PrismaOrgsRepository()
  const useCase = new RegisterUseCase(repository)

  return useCase
}
