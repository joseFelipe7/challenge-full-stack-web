import { PrismaUserRepository } from "@/repositories/implementations/prisma/PrismaUserRepository";
import { CreateUser } from "@/useCases/CreateUser";

export function createUserFactory(): CreateUser {
  const userRepository = new PrismaUserRepository();

  const useCase = new CreateUser(userRepository);

  return useCase;
}
