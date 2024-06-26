import { IUserRepository } from "@/repositories/IUserRepository";
import { hashSync } from "bcrypt";
import { UserNotFoundError } from "./errors/UserNotFoundError";

type UpdateUserRequest = {
  name?: string;
  password?: string;
};
export class UpdateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: UpdateUserRequest) {
    const userFind = await this.userRepository.findById(id);

    if (!userFind) throw new UserNotFoundError();

    userFind.props.name = data.name ?? userFind.props.name;
    userFind.props.password = data.password
      ? hashSync(data.password, 10)
      : userFind.props.password;

    const userUpdate = await this.userRepository.update(userFind);

    return userUpdate;
  }
}
