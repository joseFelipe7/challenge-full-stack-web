import { Request, Response } from "express";
import getUserRequest from "@/validators/getUserRequest";
import { getUserFactory } from "@/useCases/factories/getUserFactory"
import { UserResponse } from "@/response/UserResponse";
import { UserNotFoundError } from "@/useCases/errors/UserNotFoundError";

export class GetUserController {
    execute = async (request:Request, response:Response) => {
      
      const validate = getUserRequest.validate(request.params)
      
      if(validate.error) return response.status(422).json({message:'Invalid data'})
      
      try {
        const requestData = validate.value
        
        const getUser = getUserFactory()

        const user = await getUser.execute(requestData)

        if(user){
          return response.status(200).json({data: UserResponse.index(user), message:'get data with success'});
        }

        return response.json({data: 'ocorreu um erro ao buscar o usuario'});

      } catch (error: any) {
        if (error instanceof UserNotFoundError)
          return response.status(422).send({ message: error.message })
        return response.status(400).json({message:error.message})

      }
        
    }
  }