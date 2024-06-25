import { prismaClient } from "@/database/prismaClient";
import { Log } from "@/domain/entities/Log";
import { ILogRepository } from "@/repositories/ILogRepository";

export class PrismaLogRepository implements ILogRepository {
  async create(log: Log): Promise<Log | null> {
    const logCreate = await prismaClient.log.create({
      data: {
        id: log.id,
        action: log.props.action,
        entity: log.props.entity,
        user_id: log.props.userId,
        register_id: log.props.registerId,
      },
    });
    return log ? Log.repositoryFromEntity(logCreate) : null;
  }
}
