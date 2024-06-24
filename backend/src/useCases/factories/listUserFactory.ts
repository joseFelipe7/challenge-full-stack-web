import { PrismaUserRepository } from "@/repositories/implementations/prisma/PrismaUserRepository"
import { ListUser } from "@/useCases/ListUser"

export function listUserFactory():ListUser {
    const userRepository = new PrismaUserRepository
  
    const useCase = new ListUser(userRepository)
  
    return useCase
}