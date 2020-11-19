import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {userService} from "./service/userService";
import {userController} from './controller/user'
import {User} from "./entity/user.entity";
import {UserDao} from "./Dao/userDao";
import {Userrole} from "./entity/userrole.entity";
import {Role} from "./entity/role.entity";
import {roleController} from "./controller/role";
import {roleService} from "./service/roleService";
import {RoleDao} from "./Dao/roleDao";
import {Roleauto} from "./entity/roleauto.entity";
import {Authority} from "./entity/authority.entity";
import {AuthDao} from "./Dao/authDao";
import {authService} from "./service/authService";
import {authController} from "./controller/auth";

@Module({
    imports: [TypeOrmModule.forFeature([User,Userrole,Role,Roleauto, Authority])],
    controllers: [userController, roleController, authController],
    providers: [userService, UserDao, roleService, RoleDao, AuthDao,authService],
})
export class AuthVefifyModule {}
