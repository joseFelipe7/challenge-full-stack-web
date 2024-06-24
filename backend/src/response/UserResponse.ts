import { User } from "@/domain/entities/User"
import { list } from "@/domain/types/list";
import { paginate } from "@/domain/types/paginate";
import { userRepository } from "@/repositories/IUserRepository";

type AttributesReturn = {
  type:string,
  attributes:{
    name: string;
    email: string;
  }
};

export class UserResponse {
  name:string;
  email:string;
  private static type:string = 'user'; 

  constructor(user:User){
    this.name = user.props.name,
    this.email = user.props.email
  }
  static index(user:User):AttributesReturn{
    return {
      type:this.type,
      attributes:{
        name: user.props.name,
        email: user.props.email
      }
    }
  }
  static paginate(listUsers:list<userRepository>, perPage:number, page:number):paginate<AttributesReturn>{
    const {count:total, data:list} = listUsers
    const meta = {
      total:total,
      page:page,
      per_page:perPage,
      first_page:1,
      last_page:Math.ceil(total/perPage)
    }
    const data = list
    return {
      meta,
      data:this.collection(data)
    }
  }
  static collection(users:Array<userRepository>):Array<AttributesReturn>{
    return users.map(item=>{
      return {
        type:this.type,
        attributes:{
          name: item.name,
          email: item.email
        }
      }
    })
  }
}