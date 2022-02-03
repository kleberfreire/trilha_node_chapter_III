import {inject, injectable} from "tsyringe"
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository) {
  }



  async execute({  name,
    username,
    password,
    email,
    driver_license,
    admin}) {
    const userAlreadyExists = await this.usersRepository.findByName({ name }) 
        
    if (userAlreadyExists) {
      throw new Error("Category already exists");
    }
    
    this.usersRepository.create({  
      name,
      username,
      password,
      email,
      driver_license,
      admin
    });
  }
}

export {CreateUserUseCase}