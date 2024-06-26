import { CustomRequest } from "@/core/Request";
import { Actions } from "@/domain/entities/Log";
import { PatientResponse } from "@/response/PatientResponse";
import { PatientNotFoundError } from "@/useCases/errors/PatientNotFoundError";
import { deletePatientFactory } from "@/useCases/factories/deletePatientFactory";
import { audit } from "@/utils";
import deletePatientRequest from "@/validators/deletePatientRequest";
import { Response } from "express";

export class DeletePatientController {
  execute = async (request: CustomRequest, response: Response) => {
    const validate = deletePatientRequest.validate({
      id: request.params.id,
      ...request.body,
    });

    if (validate.error)
      return response.status(422).json({
        errors: validate.error.details,
        message: "Invalid data",
      });

    try {
      const id = request.params.id;
      const deletePatient = deletePatientFactory();

      const patient = await deletePatient.execute(id);

      if (patient) {
        await audit({
          action: Actions.Delete,
          entity: "Patient",
          userId: request?.user?.id ?? "",
          registerId: patient.id,
        });

        return response.status(204).json({
          data: PatientResponse.index(patient),
          message: "deleted with success",
        });
      }
      return response.json({ data: "ocorreu um erro ao excluir o usuario" });
    } catch (error: any) {
      if (error instanceof PatientNotFoundError)
        return response.status(422).send({ message: error.message });

      return response.status(400).json({ message: error.message });
    }
  };
}
