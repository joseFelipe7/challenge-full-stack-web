import { PatientResponse } from "@/response/PatientResponse";
import { PatientNotFoundError } from "@/useCases/errors/PatientNotFoundError";
import { getPatientFactory } from "@/useCases/factories/getPatientFactory";
import getPatientRequest from "@/validators/getPatientRequest";
import { Request, Response } from "express";

export class GetPatientController {
  execute = async (request: Request, response: Response) => {
    const validate = getPatientRequest.validate(request.params);

    if (validate.error)
      return response.status(422).json({ message: "Invalid data" });

    try {
      const requestData = validate.value;

      const getPatient = getPatientFactory();

      const patient = await getPatient.execute(requestData);

      if (patient) {
        return response.status(200).json({
          data: PatientResponse.index(patient),
          message: "get data with success",
        });
      }

      return response.json({ data: "ocorreu um erro ao buscar o usuario" });
    } catch (error: any) {
      if (error instanceof PatientNotFoundError)
        return response.status(422).send({ message: error.message });
      return response.status(400).json({ message: error.message });
    }
  };
}
