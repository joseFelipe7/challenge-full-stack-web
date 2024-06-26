import { Entity } from "@/core/Entity";
import { patientRepository } from "@/repositories/IPatientRepository";

export type PatientProps = {
  name: string;
  document: string;
  email?: string | null;
  phone: string;
  gender: string;
  birthdate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class Patient extends Entity<PatientProps> {
  private constructor(props: PatientProps, id?: string) {
    super(props, id);
  }

  static create(props: PatientProps, id?: string) {
    const patient = new Patient(props, id);
    return patient;
  }
  static repositoryFromEntity(props: patientRepository) {
    const propsLog = {
      ...props,
      createdAt: props.created_at,
      updatedAt: props.updated_at,
    };
    const patient = new Patient(propsLog, props.id);
    return patient;
  }
}
