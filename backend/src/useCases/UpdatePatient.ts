import { IPatientRepository } from "@/repositories/IPatientRepository";
import { PatientNotFoundError } from "./errors/PatientNotFoundError";

type UpdatePatientRequest = {
  name: string;
  email?: string;
  phone: string;
  gender: string;
  birthdate: Date;
};
export class UpdatePatient {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(id: string, data: UpdatePatientRequest) {
    const patientFind = await this.patientRepository.findById(id);

    if (!patientFind) throw new PatientNotFoundError();

    patientFind.props.name = data.name ?? patientFind.props.name;
    patientFind.props.email = data.email ?? patientFind.props.email;
    patientFind.props.phone = data.phone ?? patientFind.props.phone;
    patientFind.props.gender = data.gender ?? patientFind.props.gender;
    patientFind.props.birthdate = data.birthdate ?? patientFind.props.birthdate;

    const patientUpdate = await this.patientRepository.update(patientFind);

    return patientUpdate;
  }
}
