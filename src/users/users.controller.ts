import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './dtos/Users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findUsers() {
        return this.usersService.findUsers();
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        if (!createUserDto.username) {
            throw new HttpException('Username is required', 400);
        }
        if (!createUserDto.password) {
            throw new HttpException('Password is required', 400);
        }

        return this.usersService.createUser(createUserDto);
    }

    @Put(':id')
    updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        console.log(id, updateUserDto);
        this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    deleteUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
}
