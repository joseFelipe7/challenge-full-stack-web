import { CreateUserController } from "@/controllers/CreateUserController";
import { UpdateUserController } from "@/controllers/UpdateUserController";
import { Router } from "express";

const router = Router();
const createUser = new CreateUserController()
const updateUser = new UpdateUserController()

router.post('/', createUser.execute)
router.put('/:id', updateUser.execute)

export default router;