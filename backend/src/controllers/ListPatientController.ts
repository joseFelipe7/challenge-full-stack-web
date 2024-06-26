import { PatientResponse } from "@/response/PatientResponse";
import { listPatientFactory } from "@/useCases/factories/listPatientFactory";
import listPatientRequest from "@/validators/listPatientRequest";
import { Request, Response } from "express";

export class ListPatientController {
  execute = async (request: Request, response: Response) => {
    const validate = listPatientRequest.validate(request.query);

    if (validate.error)
      return response.status(422).json({
        errors: validate.error.details,
        message: "Invalid data",
      });

    try {
      const requestData = validate.value;

      const page = Number(requestData.page ?? 1);
      const per_page = Number(requestData.per_page ?? 5);
      const filter = requestData.filter ?? {};

      const listPatient = listPatientFactory();

      const patients = await listPatient.execute(filter, per_page, page);
      const paginate = PatientResponse.paginate(patients, per_page, page);

      response.status(200).json({ ...paginate, message: "list of patients" });
    } catch (error: any) {
      return response.status(400).json({ message: error.message });
    }
  };
}
