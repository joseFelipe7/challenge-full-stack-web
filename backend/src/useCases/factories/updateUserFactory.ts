import { PrismaUserRepository } from "@/repositories/implementations/prisma/PrismaUserRepository"
import { UpdateUser } from "@/useCases/UpdateUser"

export function updateUserFactory():UpdateUser {
    const invoiceRepository = new PrismaUserRepository()
  
    const useCase = new UpdateUser(invoiceRepository)
  
    return useCase
}