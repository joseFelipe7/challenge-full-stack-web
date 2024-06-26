import { PrismaUserRepository } from "@/repositories/implementations/prisma/PrismaUserRepository";
import { UpdateUser } from "@/useCases/UpdateUser";

export function updateUserFactory(): UpdateUser {
  const userRepository = new PrismaUserRepository();

  const useCase = new UpdateUser(userRepository);

  return useCase;
}
