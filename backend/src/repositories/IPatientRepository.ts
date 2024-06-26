import { Patient } from "@/domain/entities/Patient";
import { list } from "@/domain/types/list";

export type patientRepository = {
  id: string;
  name: string;
  document: string;
  email?: string | null;
  phone: string;
  gender: string;
  birthdate: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};
export interface IPatientRepository {
  create(patient: Patient): Promise<Patient | null>;
  update(user: Patient): Promise<Patient | null>;
  list(
    where: object,
    perPage: number,
    page: number
  ): Promise<list<patientRepository>>;
  findById(id: string): Promise<Patient | null>;
  findByDocument(document: string): Promise<Patient | null>;
}
