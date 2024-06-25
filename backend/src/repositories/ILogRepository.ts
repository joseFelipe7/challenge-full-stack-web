import { Log } from "@/domain/entities/Log";

export type logRepository = {
  id: string;
  action: string;
  entity: string;
  user_id: string;
  register_id: string;
  created_at: Date;
};
export interface ILogRepository {
  create(log: Log): Promise<Log | null>;
}
