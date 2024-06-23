import { User } from "@/domain/entities/User"

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
  static collection(users:Array<User>):Array<AttributesReturn>{
    return users.map(item=>{
      return {
        type:this.type,
        attributes:{
          name: item.props.name,
          email: item.props.email
        }
      }
    })
  }
}