import { Injectable, BadRequestException} from '@nestjs/common';
// import { UserViewModel } from 'src/domain/user.viewmodel'
// import { UserService } from '../user/user.service';
import { UserRepository } from 'src/repositories/repository/user-repository'
import { LoginViewModel } from 'src/domain/login.viewmodel';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // private userService: UserService,
    private userRepository: UserRepository,
    private jwtService: JwtService){
}
  async login(login: LoginViewModel) {
    const user = await this.userRepository.GetByCredentials(login.userLogin, login.password);

    if (!user) {
      throw new BadRequestException('Incorrect Credentials');
    }

      return {
        access_token: this.jwtService.sign({status: 'Authorized'}),
        userId: user._id,
      }
  }
}
