import { Request, Response } from "express";
import { UserResponse } from "@/response/UserResponse";
import updateUserRequest from "@/validators/updateUserRequest";
import { updateUserFactory } from "@/useCases/factories/updateUserFactory";
import { UserNotFoundError } from "@/useCases/errors/UserNotFoundError";


export class UpdateUserController {
    execute = async (request:Request, response:Response) => {

      const validate = updateUserRequest.validate(request.body)
       
      if(validate.error) return response.status(422).json({ 
                                                            errors:validate.error.details, 
                                                            message:'Invalid data'
                                                          })
                                                          
      try {
        const requestData = validate.value
        const id = request.params.id
        const updateUser = updateUserFactory()

        const user = await updateUser.execute(id, requestData)

        if(user){
          response.status(200).json({data: UserResponse.index(user), message:'updated with success'});
        }else{
          response.json({data: 'ocorreu ao editar o usuario'});
        }
        
      } catch (error: any) {
        if (error instanceof UserNotFoundError)
          return response.status(422).send({ message: error.message })

        return response.status(400).json({ message:error.message })

      }
        
    }
  }