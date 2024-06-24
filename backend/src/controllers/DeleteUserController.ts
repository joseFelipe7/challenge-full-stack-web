import { Request, Response } from "express";
import { UserResponse } from "@/response/UserResponse";
import deleteUserRequest from "@/validators/deleteUserRequest";
import { deleteUserFactory } from "@/useCases/factories/deleteUserFactory";
import { UserNotFoundError } from "@/useCases/errors/UserNotFoundError";


export class DeleteUserController {
    execute = async (request:Request, response:Response) => {

      const validate = deleteUserRequest.validate({id:request.params.id, ...request.body})
       
      if(validate.error) return response.status(422).json({ 
                                                            errors:validate.error.details, 
                                                            message:'Invalid data'
                                                          })
                                                          
      try {
        const requestData = validate.value
        const id = request.params.id
        const deleteUser = deleteUserFactory()

        const user = await deleteUser.execute(id)

        if(user){
          return response.status(204).json({data: UserResponse.index(user), message:'deleted with success'});
        }
        return response.json({data: 'ocorreu um erro ao excluir o usuario'});
        
      } catch (error: any) {
        if (error instanceof UserNotFoundError)
          return response.status(422).send({ message: error.message })

        return response.status(400).json({ message:error.message })

      }
        
    }
  }