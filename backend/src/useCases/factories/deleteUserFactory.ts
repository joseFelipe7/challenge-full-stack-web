import { PrismaUserRepository } from "@/repositories/implementations/prisma/PrismaUserRepository";
import { DeleteUser } from "@/useCases/DeleteUser";

export function deleteUserFactory(): DeleteUser {
  const userRepository = new PrismaUserRepository();

  const useCase = new DeleteUser(userRepository);

  return useCase;
}
