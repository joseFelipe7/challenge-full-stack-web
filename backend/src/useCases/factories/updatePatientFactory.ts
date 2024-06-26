import { PrismaPatientRepository } from "@/repositories/implementations/prisma/PrismaPatientRepository";
import { UpdatePatient } from "@/useCases/UpdatePatient";

export function updatePatientFactory(): UpdatePatient {
  const patientRepository = new PrismaPatientRepository();

  const useCase = new UpdatePatient(patientRepository);

  return useCase;
}
