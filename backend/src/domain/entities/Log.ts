import { Entity } from "@/core/Entity";
import { logRepository } from "@/repositories/ILogRepository";

export enum Actions {
  Create = "Create",
  Update = "Update",
  Delete = "Delete",
}

export type LogProps = {
  action: string;
  entity: string;
  userId: string;
  registerId: string;
};

export class Log extends Entity<LogProps> {
  private constructor(props: LogProps, id?: string) {
    super(props, id);
  }

  static create(props: LogProps, id?: string) {
    const log = new Log(props, id);
    return log;
  }
  static repositoryFromEntity(props: logRepository) {
    const propsLog = {
      ...props,
      userId: props.user_id,
      registerId: props.register_id,
    };
    const log = new Log(propsLog, props.id);
    return log;
  }
}
