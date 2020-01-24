import { IsNotEmpty, Length } from 'class-validator'

export class LoginViewModel {

  @IsNotEmpty()
  @Length(3, 10)
  readonly userLogin: string;

  @Length(3, 10)
  @IsNotEmpty()
  readonly password: string;

}
