import { IUserRepository } from "@/repositories/IUserRepository";
import { UserAlreadyExistsError } from "./errors/UserAlreadyExistsError";

export class DeleteUser {
  constructor(private userRepository: IUserRepository) {}

  async execute( id:string ) {

    const userFind = await this.userRepository.findById(id)
    
    if(!userFind) throw new UserAlreadyExistsError()

    userFind.props.deletedAt = new Date()
    
    const userDeleted = await this.userRepository.update(userFind)
    
    return userDeleted
  }
}