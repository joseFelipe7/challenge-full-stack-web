import { IUserRepository } from "@/repositories/IUserRepository";
import { UserNotFoundError } from "./errors/UserNotFoundError";

type GetRequest = {
  id: string;
};
export class GetUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: GetRequest) {
    const user = await this.userRepository.findById(data.id);

    if (!user) throw new UserNotFoundError();

    return user;
  }
}
