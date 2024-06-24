import { CreateUserController } from "@/controllers/CreateUserController";
import { UpdateUserController } from "@/controllers/UpdateUserController";
import { DeleteUserController } from "@/controllers/DeleteUserController";
import { GetUserController } from "@/controllers/GetUserController";
import { ListUserController } from "@/controllers/ListUserController";
import { Router } from "express";

const router = Router();
const createUser = new CreateUserController()
const updateUser = new UpdateUserController()
const deleteUser = new DeleteUserController()
const listUser = new ListUserController()
const getUser = new GetUserController()

router.get('/', listUser.execute)
router.get('/:id', getUser.execute)
router.post('/', createUser.execute)
router.put('/:id', updateUser.execute)
router.delete('/:id', deleteUser.execute)

export default router;