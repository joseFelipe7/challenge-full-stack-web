import { PrismaPatientRepository } from "@/repositories/implementations/prisma/PrismaPatientRepository";
import { ListPatient } from "@/useCases/ListPatient";

export function listPatientFactory(): ListPatient {
  const userRepository = new PrismaPatientRepository();

  const useCase = new ListPatient(userRepository);

  return useCase;
}
