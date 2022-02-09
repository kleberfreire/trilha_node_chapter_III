import { Request , Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle (request: Request , response: Response):Promise<Response> {
    const {  
      name,
      username,
      password,
      email,
      driver_license,
    } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)
    try {
      await createUserUseCase.execute({  
        name,
        password,
        email,
        driver_license,
      })
    
      return response.status(201).send()
    } catch (error) {
      return response.status(400).json({error: error.message})
    }
    
  }
}

export {CreateUserController}