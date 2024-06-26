import { PrismaPatientRepository } from "@/repositories/implementations/prisma/PrismaPatientRepository";
import { DeletePatient } from "@/useCases/DeletePatient";

export function deletePatientFactory(): DeletePatient {
  const patientRepository = new PrismaPatientRepository();

  const useCase = new DeletePatient(patientRepository);

  return useCase;
}
