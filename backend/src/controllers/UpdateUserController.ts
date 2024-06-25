import { CustomRequest } from "@/core/Request";
import { Actions } from "@/domain/entities/Log";
import { UserResponse } from "@/response/UserResponse";
import { UserNotFoundError } from "@/useCases/errors/UserNotFoundError";
import { updateUserFactory } from "@/useCases/factories/updateUserFactory";
import { audit } from "@/utils";
import updateUserRequest from "@/validators/updateUserRequest";
import { Response } from "express";

export class UpdateUserController {
  execute = async (request: CustomRequest, response: Response) => {
    const validate = updateUserRequest.validate({
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
      const updateUser = updateUserFactory();

      const user = await updateUser.execute(id, requestData);

      if (user) {
        await audit({
          action: Actions.Update,
          entity: "User",
          userId: request?.user?.id ?? "",
          registerId: user.id,
        });
        return response.status(200).json({
          data: UserResponse.index(user),
          message: "updated with success",
        });
      }
      return response.json({ data: "ocorreu ao editar o usuario" });
    } catch (error: any) {
      if (error instanceof UserNotFoundError)
        return response.status(422).send({ message: error.message });

      return response.status(400).json({ message: error.message });
    }
  };
}
