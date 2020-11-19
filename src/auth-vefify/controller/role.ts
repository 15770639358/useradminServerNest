import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import { userService } from '../service/userService';
import {User} from "../entity/user.entity";
import {resMessage} from "../../utils/resMessage";
import {Role} from "../entity/role.entity";
import {roleService} from "../service/roleService";
import {fromtDatatolist} from '../../utils/dataFromtToList'
import {responseData} from "../../utils/responseData";
import {Roleauto} from "../entity/roleauto.entity";

@Controller('role')
export class roleController {
    constructor(private readonly roleService: roleService) {}

    //查询所有角色并按child列表返回
    @Get('getAllRole')
    async getAllRole(): Promise<resMessage<Role[]>> {
        return await this.roleService.getAllRoles()
    }
    //查询所有角色及其权限
    @Get('getAllRolesAndAuth')
    async getAllRolesAndAuth(): Promise<resMessage<Role[]>> {
        return await this.roleService.getAllRolesAndAuth()
    }
    //addRole
    @Post('addRole')
    async addRole(@Body() role:Role): Promise<resMessage<Role>> {
        return await this.roleService.addRole(role)
    }
    //removeRoles
    @Get('removeRoles')
    async removeRoles(@Query('category') category: number): Promise<resMessage<string>> {
        return await this.roleService.removeRoles(category)
    }

    //removeRoleAuth
    @Post('addRoleAuth')
    async addRoleAuth(@Body() roleauth:Roleauto): Promise<resMessage<string>> {
        return await this.roleService.addRoleAuth(roleauth)
    }

    @Post('removeRoleAuth')
    async removeRoleAuth(@Body()  roleauth:Roleauto): Promise<resMessage<string>> {
        return await this.roleService.removeRoleAuth(roleauth)
    }
}
