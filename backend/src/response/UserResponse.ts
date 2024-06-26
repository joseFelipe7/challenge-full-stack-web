import { User } from "@/domain/entities/User";
import { list } from "@/domain/types/list";
import { paginate } from "@/domain/types/paginate";
import { userRepository } from "@/repositories/IUserRepository";

type AttributesReturn = {
  type: string;
  id: string;
  attributes: {
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  };
};

export class UserResponse {
  id: string;
  name: string;
  email: string;
  updatedAt?: Date;
  createdAt?: Date;
  deletedAt?: Date;
  private static type: string = "user";

  constructor(user: User) {
    this.id = user.id;
    this.name = user.props.name;
    this.email = user.props.email;
    this.createdAt = user.props.createdAt;
    this.updatedAt = user.props.updatedAt;
    this.deletedAt = user.props.deletedAt;
  }
  static index(user: User): AttributesReturn {
    return {
      type: this.type,
      id: user.id,
      attributes: {
        name: user.props.name,
        email: user.props.email,
        createdAt: user.props.createdAt,
        updatedAt: user.props.updatedAt,
        deletedAt: user.props.deletedAt,
      },
    };
  }
  static paginate(
    listUsers: list<userRepository>,
    perPage: number,
    page: number
  ): paginate<AttributesReturn> {
    const { count: total, data: list } = listUsers;
    const meta = {
      total: total,
      page: page,
      per_page: perPage,
      first_page: 1,
      last_page: Math.ceil(total / perPage),
    };
    const data = list;
    return {
      meta,
      data: this.collection(data),
    };
  }
  static collection(users: Array<userRepository>): Array<AttributesReturn> {
    return users.map((item) => {
      return {
        type: this.type,
        id: item.id,
        attributes: {
          name: item.name,
          email: item.email,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          deletedAt: item.deleted_at,
        },
      };
    });
  }
}
