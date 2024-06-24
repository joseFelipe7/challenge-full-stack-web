import { list } from "@/domain/types/list";
import { IUserRepository, userRepository } from "@/repositories/IUserRepository";

export class ListUser {
    constructor(private userRepository: IUserRepository) {}

  async execute(filter:object, perPage:number, page:number):Promise<list<userRepository>> {
    
    const whereFormat:any = {}
    Object.entries(filter).forEach(function([key, value]) {
        whereFormat[key] = {
            contains:value
        };
    });
    console.log(whereFormat)

    const results = await this.userRepository.list(whereFormat, perPage, page)
    return results
    
  }
}