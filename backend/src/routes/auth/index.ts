import { AuthenticateController } from "@/controllers/AuthenticateController";
import { Router } from "express";

const router = Router();
const authenticate = new AuthenticateController();

router.post("/", authenticate.execute);

export default router;
