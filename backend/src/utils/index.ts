import { PrismaLogRepository } from "@/repositories/implementations/prisma/PrismaLogRepository";
import { Audit, logData } from "@/utils/Audit";
import validateCPF from "@/utils/validateCPF";

async function audit(data: logData) {
  const logRepository = new PrismaLogRepository();

  const useCase = new Audit(logRepository);

  const log = await useCase.execute(data);
  return log;
}
export { audit, validateCPF };
