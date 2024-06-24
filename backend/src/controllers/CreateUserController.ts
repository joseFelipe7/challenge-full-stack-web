import { Request, Response } from "express";
import { UserResponse } from "@/response/UserResponse";
import createUserRequest from "@/validators/createUserRequest";
import { createUserFactory } from "@/useCases/factories/createUserFactory";
import { UserAlreadyExistsError } from "@/useCases/errors/UserAlreadyExistsError";

export class CreateUserController {
    execute = async (request:Request, response:Response) => {

      const validate = createUserRequest.validate(request.body)
       
      if(validate.error) return response.status(422).json({ 
                                                            errors:validate.error.details, 
                                                            message:'Invalid data'
                                                          })
                                                          
      try {
        const requestData = validate.value
        
        const createUser = createUserFactory()

        const user = await createUser.execute(requestData)

        if(user){
          response.status(201).json({data: UserResponse.index(user), message:'created with success'});
        }else{
          response.json({data: 'ocorreu um erro ao criar o usuario'});
        }
        
      } catch (error: any) {
        if (error instanceof UserAlreadyExistsError)
          return response.status(422).send({ message: error.message })

        return response.status(400).json({ message:error.message })

      }
        
    }
  }