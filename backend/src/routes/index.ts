import { Router, Request, Response } from "express";
import auth from '@/routes/auth'
import user from '@/routes/user'
const router = Router();

router.get("/", (req: Request, res: Response)=>{ res.json({ message:'api runner' }) });

router.use('/auth', auth)
router.use('/user', user)

export { router };