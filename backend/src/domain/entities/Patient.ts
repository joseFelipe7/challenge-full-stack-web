import { Entity } from "@/core/Entity";

export type PatientProps = {
  name: string;
  document: string;
  email?: string | null;
  phone: string;
  gender: string;
  birthdate: Date;
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
}
