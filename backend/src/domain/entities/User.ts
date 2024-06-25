import { Entity } from "../../core/Entity";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  deletedAt?: Date;
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static create(props: UserProps, id?: string) {
    const user = new User(props, id);
    return user;
  }
}
