import { CustomRequest } from "@/core/Request";
import { Actions } from "@/domain/entities/Log";
import { PatientResponse } from "@/response/PatientResponse";
import { PatientNotFoundError } from "@/useCases/errors/PatientNotFoundError";
import { updatePatientFactory } from "@/useCases/factories/updatePatientFactory";
import { audit } from "@/utils";
import updatePatientRequest from "@/validators/updatePatientRequest";
import { Response } from "express";

export class UpdatePatientController {
  execute = async (request: CustomRequest, response: Response) => {
    const validate = updatePatientRequest.validate({
      id: request.params.id,
      ...request.body,
    });

    if (validate.error)
      return response.status(422).json({
        errors: validate.error.details,
        message: "Invalid data",
      });

    try {
      const requestData = validate.value;
      const id = request.params.id;
      const updatePatient = updatePatientFactory();

      const patient = await updatePatient.execute(id, requestData);

      if (patient) {
        await audit({
          action: Actions.Update,
          entity: "Patient",
          userId: request?.user?.id ?? "",
          registerId: patient.id,
        });
        console.log(PatientResponse.index(patient));
        return response.status(200).json({
          data: PatientResponse.index(patient),
          message: "updated with success",
        });
      }
      return response.json({ data: "ocorreu ao editar o usuario" });
    } catch (error: any) {
      if (error instanceof PatientNotFoundError)
        return response.status(422).send({ message: error.message });

      return response.status(400).json({ message: error.message });
    }
  };
}
