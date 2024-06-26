import { PrismaPatientRepository } from "@/repositories/implementations/prisma/PrismaPatientRepository";
import { CreatePatient } from "@/useCases/CreatePatient";

export function createPatientFactory(): CreatePatient {
  const patientRepository = new PrismaPatientRepository();

  const useCase = new CreatePatient(patientRepository);

  return useCase;
}
