import { PrismaPatientRepository } from "@/repositories/implementations/prisma/PrismaPatientRepository";
import { GetPatient } from "@/useCases/GetPatient";

export function getPatientFactory(): GetPatient {
  const patientsRepository = new PrismaPatientRepository();

  const useCase = new GetPatient(patientsRepository);

  return useCase;
}
