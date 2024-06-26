import { Patient } from "@/domain/entities/Patient";
import { list } from "@/domain/types/list";
import { paginate } from "@/domain/types/paginate";
import { patientRepository } from "@/repositories/IPatientRepository";

type AttributesReturn = {
  type: string;
  id: string;
  attributes: {
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
};

export class PatientResponse {
  id: string;
  name: string;
  document: string;
  email?: string | null;
  phone: string;
  gender: string;
  birthdate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  private static type: string = "patient";

  constructor(patient: Patient) {
    this.id = patient.id;
    this.name = patient.props.name;
    this.email = patient.props.email;
    this.document = patient.props.document;
    this.phone = patient.props.phone;
    this.gender = patient.props.gender;
    this.birthdate = patient.props.birthdate;
    this.updatedAt = patient.props.updatedAt;
    this.deletedAt = patient.props.deletedAt;
  }
  static index(patient: Patient): AttributesReturn {
    console.log(patient);
    return {
      type: this.type,
      id: patient.id,
      attributes: {
        name: patient.props.name,
        email: patient.props.email,
        document: patient.props.document,
        phone: patient.props.phone,
        gender: patient.props.gender,
        birthdate: patient.props.birthdate,
        createdAt: patient.props.createdAt,
        updatedAt: patient.props.updatedAt,
      },
    };
  }
  static paginate(
    listPatients: list<patientRepository>,
    perPage: number,
    page: number
  ): paginate<AttributesReturn> {
    const { count: total, data: list } = listPatients;
    const meta = {
      total: total,
      page: page,
      per_page: perPage,
      first_page: 1,
      last_page: Math.ceil(total / perPage),
    };
    const data = list;
    return {
      meta,
      data: this.collection(data),
    };
  }
  static collection(
    patients: Array<patientRepository>
  ): Array<AttributesReturn> {
    return patients.map((item) => {
      return {
        type: this.type,
        id: item.id,
        attributes: {
          name: item.name,
          email: item.email,
          document: item.document,
          phone: item.phone,
          gender: item.gender,
          birthdate: item.birthdate,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        },
      };
    });
  }
}
