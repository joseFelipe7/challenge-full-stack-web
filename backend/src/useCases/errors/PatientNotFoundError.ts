export class PatientNotFoundError extends Error {
  constructor() {
    super("Patient not found, please check the provided data");
  }
}
