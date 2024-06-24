import { PrismaUserRepository } from "@/repositories/implementations/prisma/PrismaUserRepository"
import { GetUser } from "@/useCases/GetUser"

export function getUserFactory():GetUser {
    const usersRepository = new PrismaUserRepository
  
    const useCase = new GetUser(usersRepository)
  
    return useCase
}