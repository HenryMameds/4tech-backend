import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/repository/user-repository'
import { UserViewModel } from 'src/domain/user.viewmodel';
import { LoginViewModel } from 'src/domain/login.viewmodel';

@Injectable()
export class UserService {
  constructor(readonly userRepository: UserRepository){
  }

  getUsers() {
    return this.userRepository.getUsers();
  }

  async createNewUser(newUser: UserViewModel) {

    const userList = await this.userRepository.getUsers();

    const existingUser = userList.find(x => x.userName === newUser.userName);
    if (existingUser){
      throw new BadRequestException('This username already exists!')
    }

    return this.userRepository.createUser(newUser);
  }

  createGroupUser(newUser: UserViewModel[]) {

    return newUser

    // for (let i = 0; i < newUser.length; i++) {
    //       console.log(newUser)
    //   }
    // for i = 0
    //
    // const userList = this.userRepository.getUsers();
    //
    // const existingUser = userList.find(x => x.userName === newUser.userName);
    // if (existingUser){
    //   throw new BadRequestException('This username already exists!')
    // }
    //
    // return this.userRepository.createUser(newUser);
  }

  async updateUser(updateUser: UserViewModel) {

    const userList =  await this.userRepository.getUsers();

    const userIndex = userList.findIndex((x => x.userName === updateUser.userName));

    const existingUser = userList.find(x => x.userName === updateUser.userName);

    if (existingUser){
      // userList[userIndex] = updateUser;
      return " Updated User ";
    }

    return "User Not Found";
  }

  async deleteUser(deleteUser: UserViewModel) {

    const userList = await this.userRepository.getUsers();

    const existingUser = userList.find(x => x.userName === deleteUser.userName);
    if (existingUser){
      userList.splice(userList.findIndex((x => x.userName === deleteUser.userName)));
      return "User Deleted";
    }

    return "User Not Found";
  }


   async attempLogin(login: LoginViewModel) {
    const userList = await this.userRepository.getUsers();

    const foundLogin = userList.find(x =>
      x.userLogin === login.userLogin &&
      x.password === login.password);

      return foundLogin;
  }

}
