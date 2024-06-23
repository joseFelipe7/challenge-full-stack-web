import { prismaClient } from "@/database/prismaClient";
import { IUserRepository } from "@/repositories/IUserRepository";
import { User } from "@/domain/entities/User";

export class PrismaUserRepository implements IUserRepository{
  async findByEmail(email: string):Promise<User | null>{
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    })
    return user ? User.create(user, user.id):null
  }
  async findById(id: string){
    return null
  }
}