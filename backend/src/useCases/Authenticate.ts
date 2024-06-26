import { IUserRepository } from "@/repositories/IUserRepository";
import { InvalidCredentialsError } from "@/useCases/errors/InvalidCredentialsError";
import { compareSync } from "bcrypt";
import { UserNotFoundError } from "./errors/UserNotFoundError";

type AuthenticateRequest = {
  email: string;
  password: string;
};
export class Authenticate {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: AuthenticateRequest) {
    const user = await this.userRepository.findByEmail(data.email);
    console.log(user?.props.deletedAt);
    if (user?.props.deletedAt) throw new UserNotFoundError();

    if (!user) throw new InvalidCredentialsError();

    if (!compareSync(data.password, user.props.password))
      throw new InvalidCredentialsError();

    return user;
  }
}
