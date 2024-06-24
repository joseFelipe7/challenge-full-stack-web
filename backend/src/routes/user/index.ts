import { CreateUserController } from "@/controllers/CreateUserController";
import { Router } from "express";

const router = Router();
const createUser = new CreateUserController()

router.post('/', createUser.execute)

export default router;