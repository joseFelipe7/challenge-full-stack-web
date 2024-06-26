import { AuthMiddleware } from "@/middleware/AuthMiddleware";
import auth from "@/routes/auth";
import patient from "@/routes/patient";
import register from "@/routes/register";
import user from "@/routes/user";
import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "api runner" });
});
router.get("/secret", AuthMiddleware.execute, (req: Request, res: Response) => {
  res.status(200).json({ message: "api runner" });
});
router.get("/logged", AuthMiddleware.execute, (req: Request, res: Response) => {
  res.status(200).json({ message: "api runner" });
});

router.use("/auth", auth);
router.use("/register", register);
router.use("/user", AuthMiddleware.execute, user);
router.use("/patient", AuthMiddleware.execute, patient);

export { router };
