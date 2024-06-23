import { Router, Request, Response } from "express";
import auth from '@/routes/auth'
const router = Router();

router.get("/", (req: Request, res: Response)=>{ res.json({ message:'api runner' }) });

router.use('/auth', auth)

export { router };