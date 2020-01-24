import { Controller, Get, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';
import {UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/user.viewmodel';
import  { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

  constructor(private userService: UserService){}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  retornarUsuarios() {
    return this.userService.getUsers();
  }

  @Post()
  criarUsuarios(@Body() newUser: UserViewModel) {
    return this.userService.createNewUser(newUser);
  }

  @Post('gruop')
  criarGrupoUsuarios(@Body() newUser: UserViewModel[]) {
    return this.userService.createGroupUser(newUser);
  }

  @Put()
  atualizarUsuarios(@Body() updateUser: UserViewModel){
    return this.userService.updateUser(updateUser);
  }

  @Delete()
  deletarUsuarios(@Body() deleteUser: UserViewModel){
    return this.userService.deleteUser(deleteUser);
  }

}
