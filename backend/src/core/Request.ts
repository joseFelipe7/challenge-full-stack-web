import { User } from "@/domain/entities/User";
import { Request } from "express";

export interface CustomRequest extends Request {
  user?: User;
}
