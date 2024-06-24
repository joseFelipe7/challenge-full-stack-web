import { PrismaUserRepository } from "@/repositories/implementations/prisma/PrismaUserRepository"
import { CreateUser } from "@/useCases/CreateUser"

export function createUserFactory():CreateUser {
    const invoiceRepository = new PrismaUserRepository()
  
    const useCase = new CreateUser(invoiceRepository)
  
    return useCase
}