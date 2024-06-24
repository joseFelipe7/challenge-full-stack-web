import { PrismaUserRepository } from "@/repositories/implementations/prisma/PrismaUserRepository"
import { DeleteUser } from "@/useCases/DeleteUser"

export function deleteUserFactory():DeleteUser {
    const invoiceRepository = new PrismaUserRepository()
  
    const useCase = new DeleteUser(invoiceRepository)
  
    return useCase
}