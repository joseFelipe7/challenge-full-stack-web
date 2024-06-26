import { IUserRepository } from "@/repositories/IUserRepository";
import { UserNotFoundError } from "./errors/UserNotFoundError";

export class DeleteUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    const userFind = await this.userRepository.findById(id);

    if (!userFind) throw new UserNotFoundError();

    userFind.props.deletedAt = new Date();

    const userDeleted = await this.userRepository.update(userFind);

    return userDeleted;
  }
}
