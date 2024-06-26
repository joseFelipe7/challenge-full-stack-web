import { prismaClient } from "@/database/prismaClient";
import { Patient } from "@/domain/entities/Patient";
import { list } from "@/domain/types/list";
import {
  IPatientRepository,
  patientRepository,
} from "@/repositories/IPatientRepository";

export class PrismaPatientRepository implements IPatientRepository {
  async create(patient: Patient): Promise<Patient | null> {
    const patientCreate = await prismaClient.patient.create({
      data: {
        id: patient.id,
        name: patient.props.name,
        email: patient.props.email,
        birthdate: patient.props.birthdate,
        document: patient.props.document,
        phone: patient.props.phone,
        gender: patient.props.gender,
      },
    });
    return patient ? Patient.create(patientCreate, patientCreate.id) : null;
  }
  async update(patient: Patient): Promise<Patient | null> {
    const patientUpdate = await prismaClient.patient.update({
      where: {
        id: patient.id,
      },
      data: {
        name: patient.props.name,
        email: patient.props.email,
        birthdate: patient.props.birthdate,
        document: patient.props.document,
        phone: patient.props.phone,
        deleted_at: patient.props.deletedAt,
      },
    });
    return patient ? Patient.create(patientUpdate, patientUpdate.id) : null;
  }
  async list(
    where: object,
    perPage: number,
    page: number
  ): Promise<list<patientRepository>> {
    const results = await prismaClient.$transaction([
      prismaClient.patient.count({ where: where }),
      prismaClient.patient.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        where: where,
        orderBy: {
          created_at: "desc",
        },
      }),
    ]);
    if (results) {
      const [count, data] = results;
      return {
        count: count,
        data: data,
      };
    }
    return { count: 0, data: [] };
  }
  async findByDocument(document: string): Promise<Patient | null> {
    const patient = await prismaClient.patient.findUnique({
      where: {
        document: document,
      },
    });
    return patient ? Patient.create(patient, patient.id) : null;
  }
  async findById(id: string) {
    const patient = await prismaClient.patient.findUnique({
      where: {
        id: id,
      },
    });
    return patient ? Patient.create(patient, patient.id) : null;
  }
}
