import { PrismaUserRepository } from "@/repositories/implementations/prisma/PrismaUserRepository"
import { Authenticate } from "@/useCases/Authenticate"

export function authenticateFactory():Authenticate {
    const usersRepository = new PrismaUserRepository
  
    const useCase = new Authenticate(usersRepository)
  
    return useCase
}