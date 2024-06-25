import { AuthMiddleware } from "@/middleware/AuthMiddleware";
import auth from "@/routes/auth";
import user from "@/routes/user";
import { Request, Response, Router } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "api runner" });
});
router.get("/secret", AuthMiddleware.execute, (req: Request, res: Response) => {
  res.json({ message: "api runner" });
});

router.use("/auth", auth);
router.use("/user", user);

export { router };
