import { IPatientRepository } from "@/repositories/IPatientRepository";
import { PatientNotFoundError } from "./errors/PatientNotFoundError";

export class DeletePatient {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(id: string) {
    const patientFind = await this.patientRepository.findById(id);

    if (!patientFind) throw new PatientNotFoundError();

    patientFind.props.deletedAt = new Date();

    const patientDeleted = await this.patientRepository.update(patientFind);

    return patientDeleted;
  }
}
