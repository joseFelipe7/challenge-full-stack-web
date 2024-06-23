import { Request, Response } from "express";
import authenticateRequest from "@/validators/authenticateRequest";
import { authenticateFactory } from "@/useCases/factories/authenticateFactory"

import jwt, { Secret } from 'jsonwebtoken';
import { InvalidCredentialsError } from "@/useCases/errors/InvalidCredentialsError";
import { UserResponse } from "@/response/UserResponse";

const SECRET_KEY: Secret = process.env.SECRET_KEY??'';

export class AuthenticateController {
    execute = async (request:Request, response:Response) => {
        const validate = authenticateRequest.validate(request.body)
       
        if(validate.error) return response.status(422).json({ 
          errors:validate.error.details, 
          message:'Invalid data'
        })
        
        try {
          const requestData = validate.value
          
          const authenticate = authenticateFactory()

          const user = await authenticate.execute(requestData)

          const token = jwt.sign( {user} , SECRET_KEY, {
            expiresIn: process.env.TOKEN_EXPIRES_IN,
          });
          
          response.json({data: UserResponse.index(user), authorization:{token}});
        } catch (error: any) {
          if (error instanceof InvalidCredentialsError)
            return response.status(403).send({ message: error.message })
          
          return response.status(400).json({message:error.message})
        }
        
    }
  }