import { Patient } from "@/domain/entities/Patient";
import { list } from "@/domain/types/list";
import { paginate } from "@/domain/types/paginate";
import { patientRepository } from "@/repositories/IPatientRepository";

type AttributesReturn = {
  type: string;
  attributes: {
    name: string;
    document: string;
    email?: string | null;
    phone: string;
    gender: string;
    birthdate: Date;
    deletedAt?: Date;
  };
};

export class PatientResponse {
  name: string;
  document: string;
  email?: string | null;
  phone: string;
  gender: string;
  birthdate: Date;
  private static type: string = "patient";

  constructor(patient: Patient) {
    this.name = patient.props.name;
    this.email = patient.props.email;
    this.document = patient.props.document;
    this.phone = patient.props.phone;
    this.gender = patient.props.gender;
    this.birthdate = patient.props.birthdate;
  }
  static index(patient: Patient): AttributesReturn {
    return {
      type: this.type,
      attributes: {
        name: patient.props.name,
        email: patient.props.email,
        document: patient.props.document,
        phone: patient.props.phone,
        gender: patient.props.gender,
        birthdate: patient.props.birthdate,
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
        attributes: {
          name: item.name,
          email: item.email,
          document: item.document,
          phone: item.phone,
          gender: item.gender,
          birthdate: item.birthdate,
        },
      };
    });
  }
}
