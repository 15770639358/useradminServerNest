import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import { userService } from '../service/userService';
import {User} from "../entity/user.entity";
import {resMessage} from "../../utils/resMessage";

@Controller('user')
export class userController {
    constructor(private readonly userService: userService) {
    }

    @Post('login')
    login(@Body() user: User): Promise<resMessage<User>> {
        return this.userService.login(user)
    }

    @Get('info')
    getUserInfo(@Query('id') userId: number): Promise<resMessage<User>> {
        return this.userService.getUserInfo(userId)
    }

    @Get('getAllUser')
    getAllUser(): Promise<resMessage<User[]>> {
        return this.userService.getAllUser()
    }

    @Get('getAllUserAndRoles')
    getAllUserAndRoles(): Promise<resMessage<User[]>> {
        return this.userService.getAllUserAndRoles()
    }

    @Get('addUserRoles')
    addUserRoles(@Query('userId') userId: number, @Query('roleId') roleId: number): Promise<resMessage<string>> {
        return this.userService.addUserRoles(userId, roleId)
    }

    @Get('removeUserRole')
    removeUserRole(@Query('userId') userId: number, @Query('roleId') roleId: number): Promise<resMessage<string>> {
        return this.userService.removeUserRole(userId, roleId)
    }

    @Get('removeUser')
    removeUser(@Query('userId') userId: number): Promise<resMessage<string>> {
        return this.userService.removeUser(userId)
    }

    @Post('addUser')
    addUser(@Body() user: User): Promise<resMessage<string>> {
        return this.userService.addUser(user)
    }

    @Post('getCountByUserName')
    getCountByUserName(@Body('username') username: string): Promise<resMessage<number>> {
        return this.userService.getCountByUserName(username)
    }
    //updatePassword
    @Post('updatePassword')
    updatePassword(@Body() user: User): Promise<resMessage<string>> {
        return this.userService.updatePassword(user)
    }
}
