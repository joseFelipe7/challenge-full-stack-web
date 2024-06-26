import { Entity } from "@/core/Entity";
import { userRepository } from "@/repositories/IUserRepository";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static create(props: UserProps, id?: string) {
    const user = new User(props, id);
    return user;
  }
  static repositoryFromEntity(props: userRepository) {
    const propsLog = {
      ...props,
      createdAt: props.created_at,
      updatedAt: props.updated_at,
      deletedAt: props.deleted_at,
    };
    const user = new User(propsLog, props.id);
    return user;
  }
}
