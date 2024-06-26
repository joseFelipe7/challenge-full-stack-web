import { list } from "@/domain/types/list";
import {
  IPatientRepository,
  patientRepository,
} from "@/repositories/IPatientRepository";

export class ListPatient {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(
    filter: object,
    perPage: number,
    page: number
  ): Promise<list<patientRepository>> {
    const whereFormat: any = {};
    Object.entries(filter).forEach(function ([key, value]) {
      whereFormat[key] = {
        contains: value,
      };
    });

    const results = await this.patientRepository.list(
      whereFormat,
      perPage,
      page
    );
    return results;
  }
}
