import { Actions, Log } from "@/domain/entities/Log";
import { ILogRepository } from "@/repositories/ILogRepository";

export type logData = {
  action: Actions;
  entity: string;
  userId: string;
  registerId: string;
};
export class Audit {
  constructor(private userRepository: ILogRepository) {}

  async execute(data: logData): Promise<Log | null> {
    const log = Log.create(data);

    const logCreate = await this.userRepository.create(log);

    return logCreate;
  }
}
