import { User } from "@/domain/entities/User";
import { IUserRepository } from "@/repositories/IUserRepository";
import { hashSync } from "bcrypt";
import { UserAlreadyExistsError } from "./errors/UserAlreadyExistsError";

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};
export class CreateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserRequest) {
    const userFind = await this.userRepository.findByEmail(data.email);

    if (userFind) throw new UserAlreadyExistsError();

    const user = User.create({
      name: data.name,
      email: data.email,
      password: hashSync(data.password, 10),
    });

    const userCreate = await this.userRepository.create(user);

    return userCreate;
  }
}
