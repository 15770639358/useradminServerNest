import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import { userService } from '../service/userService';
import {User} from "../entity/user.entity";
import {resMessage} from "../../utils/resMessage";
import {Role} from "../entity/role.entity";
import {roleService} from "../service/roleService";
import {fromtDatatolist} from '../../utils/dataFromtToList'
import {responseData} from "../../utils/responseData";
import {authService} from "../service/authService";
import {Authority} from "../entity/authority.entity";

@Controller('auth')
export class authController {
    constructor(private readonly authService: authService) {}

    //根据角色id查询其权限信息
    @Get('getAuthByRoleId')
    async getAuthByRoleId(@Query('id') roleId: number): Promise<resMessage<Authority[]>> {
        return await this.authService.getAuthByRoleId(roleId)
    }

    //查询所有权限
    @Get('getAllAuth')
    async getAllAuth() :Promise<resMessage<Authority[]>> {
        return await this.authService.getAllAuth()
    }
}
