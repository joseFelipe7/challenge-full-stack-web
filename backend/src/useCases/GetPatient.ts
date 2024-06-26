import { IPatientRepository } from "@/repositories/IPatientRepository";
import { PatientNotFoundError } from "./errors/PatientNotFoundError";

type GetRequest = {
  id: string;
};
export class GetPatient {
  constructor(private userRepository: IPatientRepository) {}

  async execute(data: GetRequest) {
    const user = await this.userRepository.findById(data.id);

    if (!user) throw new PatientNotFoundError();

    return user;
  }
}
