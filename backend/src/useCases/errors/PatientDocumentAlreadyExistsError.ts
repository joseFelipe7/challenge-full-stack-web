export class PatientDocumentAlreadyExistsError extends Error {
  constructor() {
    super("There is already a patient with this document");
  }
}
