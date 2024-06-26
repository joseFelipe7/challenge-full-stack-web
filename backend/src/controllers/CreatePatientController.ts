import { CustomRequest } from "@/core/Request";
import { Actions } from "@/domain/entities/Log";
import { PatientResponse } from "@/response/PatientResponse";
import { PatientDocumentAlreadyExistsError } from "@/useCases/errors/PatientDocumentAlreadyExistsError";
import { createPatientFactory } from "@/useCases/factories/createPatientFactory";
import { audit } from "@/utils";
import createPatientRequest from "@/validators/createPatientRequest";
import { Response } from "express";

export class CreatePatientController {
  execute = async (request: CustomRequest, response: Response) => {
    const validate = createPatientRequest.validate(request.body);

    if (validate.error)
      return response.status(422).json({
        errors: validate.error.details,
        message: "Invalid data",
      });

    try {
      const requestData = validate.value;

      const createPatient = createPatientFactory();

      const patient = await createPatient.execute(requestData);

      if (patient) {
        await audit({
          action: Actions.Create,
          entity: "Patient",
          userId: request?.user?.id || "",
          registerId: patient.id,
        });
        response.status(201).json({
          data: PatientResponse.index(patient),
          message: "created with success",
        });
      } else {
        response.json({ data: "ocorreu um erro ao criar o usuario" });
      }
    } catch (error: any) {
      if (error instanceof PatientDocumentAlreadyExistsError)
        return response.status(422).send({ message: error.message });

      return response.status(400).json({ message: error.message });
    }
  };
}
