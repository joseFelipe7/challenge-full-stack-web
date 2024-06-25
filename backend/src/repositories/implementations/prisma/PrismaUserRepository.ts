import { prismaClient } from "@/database/prismaClient";
import { User } from "@/domain/entities/User";
import { list } from "@/domain/types/list";
import {
  IUserRepository,
  userRepository,
} from "@/repositories/IUserRepository";

export class PrismaUserRepository implements IUserRepository {
  async create(user: User): Promise<User | null> {
    const userCreate = await prismaClient.user.create({
      data: {
        id: user.id,
        name: user.props.name,
        email: user.props.email,
        password: user.props.password,
      },
    });
    return user ? User.create(userCreate, userCreate.id) : null;
  }
  async update(user: User): Promise<User | null> {
    const userUpdate = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.props.name,
        password: user.props.password,
        deleted_at: user.props.deletedAt,
      },
    });
    return user ? User.create(userUpdate, userUpdate.id) : null;
  }
  async list(
    where: object,
    perPage: number,
    page: number
  ): Promise<list<userRepository>> {
    const results = await prismaClient.$transaction([
      prismaClient.user.count({ where: where }),
      prismaClient.user.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        where: where,
        orderBy: {
          created_at: "desc",
        },
      }),
    ]);
    if (results) {
      const [count, data] = results;
      return {
        count: count,
        data: data,
      };
    }
    return { count: 0, data: [] };
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
    return user ? User.create(user, user.id) : null;
  }
  async findById(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
    });
    return user ? User.create(user, user.id) : null;
  }
}
