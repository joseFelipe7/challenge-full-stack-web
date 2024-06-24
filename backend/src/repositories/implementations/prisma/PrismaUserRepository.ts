import { prismaClient } from "@/database/prismaClient";
import { IUserRepository } from "@/repositories/IUserRepository";
import { User } from "@/domain/entities/User";

export class PrismaUserRepository implements IUserRepository{
  async create(user: User): Promise<User | null> {
    const userCreate = await prismaClient.user.create({
      data:{
        id:user.id,
        name:user.props.name,
        email:user.props.email,
        password:user.props.password,
      }
    })
    return user ? User.create(userCreate, userCreate.id):null

  }
  async update(user: User): Promise<User | null> {
    const userUpdate = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.props.name,
        password: user.props.password,
      },
    })
    return user ? User.create(userUpdate, userUpdate.id):null
  }
  async findByEmail(email: string):Promise<User | null>{
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    })
    return user ? User.create(user, user.id):null
  }
  async findById(id: string){
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
    })
    return user ? User.create(user, user.id):null
  }
}