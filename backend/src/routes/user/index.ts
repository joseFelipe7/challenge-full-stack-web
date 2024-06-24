import { CreateUserController } from "@/controllers/CreateUserController";
import { UpdateUserController } from "@/controllers/UpdateUserController";
import { ListUserController } from "@/controllers/ListUserController";
import { Router } from "express";

const router = Router();
const createUser = new CreateUserController()
const updateUser = new UpdateUserController()
const listUser = new ListUserController()

router.get('/', listUser.execute)
router.post('/', createUser.execute)
router.put('/:id', updateUser.execute)

export default router;