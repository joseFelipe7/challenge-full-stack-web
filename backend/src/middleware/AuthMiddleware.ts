import { CustomRequest } from "@/core/Request";
import { User, UserProps } from "@/domain/entities/User";
import { NextFunction, Response } from "express";

import jwt, { Secret } from "jsonwebtoken";

interface IPayloadUser {
  user: {
    props: UserProps;
    _id: string;
  };
  iat: number;
  exp: number;
}

export class AuthMiddleware {
  static async execute(req: CustomRequest, res: Response, next: NextFunction) {
    const SECRET_KEY: Secret = process.env.SECRET_KEY ?? "";
    if (!req.headers.authorization)
      return res.status(403).json({ error: "No credentials sent!" });

    const [, authToken] = req.headers.authorization?.split("Bearer ");

    jwt.verify(authToken, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: "invalid token" });

      const { user: userData } = user as IPayloadUser;
      req.user = User.create(userData.props, userData._id);

      return next();
    });
  }
}
