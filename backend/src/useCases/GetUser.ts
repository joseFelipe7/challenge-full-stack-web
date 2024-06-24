import { IUserRepository } from "@/repositories/IUserRepository";
import { UserAlreadyExistsError } from "./errors/UserAlreadyExistsError";

type GetRequest = {
    id: string;
}
export class GetUser {
  constructor(private userRepository: IUserRepository) {}

  async execute( data: GetRequest ) {

    const user = await this.userRepository.findById(data.id)
    
    if(!user) throw new UserAlreadyExistsError()
    
    return user
  }
}