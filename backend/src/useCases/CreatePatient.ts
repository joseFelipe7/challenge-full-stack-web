import { Patient } from "@/domain/entities/Patient";
import { IPatientRepository } from "@/repositories/IPatientRepository";
import { PatientDocumentAlreadyExistsError } from "./errors/PatientDocumentAlreadyExistsError";

type CreatePatientRequest = {
  name: string;
  document: string;
  email?: string;
  phone: string;
  gender: string;
  birthdate: Date;
};
export class CreatePatient {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(data: CreatePatientRequest) {
    const patientFind = await this.patientRepository.findByDocument(
      data.document
    );

    if (patientFind) throw new PatientDocumentAlreadyExistsError();

    const patient = Patient.create({
      name: data.name,
      document: data.document,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      birthdate: data.birthdate,
    });

    const patientCreate = await this.patientRepository.create(patient);

    return patient;
  }
}
