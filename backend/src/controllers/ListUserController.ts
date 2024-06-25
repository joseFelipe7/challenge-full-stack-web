import { UserResponse } from "@/response/UserResponse";
import { listUserFactory } from "@/useCases/factories/listUserFactory";
import listUserRequest from "@/validators/listUserRequest";
import { Request, Response } from "express";

export class ListUserController {
  execute = async (request: Request, response: Response) => {
    const validate = listUserRequest.validate(request.query);

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

      const listUser = listUserFactory();

      const users = await listUser.execute(filter, per_page, page);
      const paginate = UserResponse.paginate(users, per_page, page);

      response.status(200).json({ ...paginate, message: "list of users" });
    } catch (error: any) {
      return response.status(400).json({ message: error.message });
    }
  };
}
