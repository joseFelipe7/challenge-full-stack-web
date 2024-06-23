import { Router } from "express";
import { AuthenticateController } from "@/controllers/AuthenticateController";

const router = Router();
const authenticate = new AuthenticateController()

router.post('/', authenticate.execute)

export default router;