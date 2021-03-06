import { compare } from "bcryptjs"
import { inject, injectable } from "tsyringe";
import { sign }  from "jsonwebtoken"

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";



interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository) {}
  async execute ({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    
    if(!user) {
      throw new AppError("Email or password incorrect!")
    }
    
    const passwordMath = await compare(password, user.password)
    
    if(!passwordMath) {
      throw new AppError("Email or password incorrect!")
    }

    const token = sign({}, "0d45d113d6ef6599e8db588f592ab524", { subject: user.id, expiresIn: "1d" })
    
    return { 
      user: {
        name: user.name, 
        email: user.email
      } , 
      token 
    }
  }
}

export {AthenticateUserUseCase}