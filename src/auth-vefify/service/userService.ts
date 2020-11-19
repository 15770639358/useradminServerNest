import { Injectable } from '@nestjs/common';
import { UserInterfaceServive } from '../interface/interfaceService/userInterfaceService'
import {User} from "../entity/user.entity";
import {resMessage} from '../../utils/resMessage'
import {UserDao} from "../Dao/userDao";
import {responseData} from "../../utils/responseData";
import {resCode} from "../../utils/resCode";
import {fromtDatatolist} from "../../utils/dataFromtToList";
import {getToken} from "../../utils/getToken";

@Injectable()
export class userService implements UserInterfaceServive{

    constructor(private readonly userDao: UserDao) {}

    async login(user: User): Promise<resMessage<User>> {
        try {
            let data = await this.userDao.login(user)
            if (data) {
                let token = getToken(data.username)
                data['token'] = token
                return responseData(0,data,resCode[0])
            }else {
                return responseData(1,data,resCode[1])
            }
        }catch {
            return responseData(500,new User(),resCode[500])
        }
    }

    async getUserInfo(userId: number): Promise<resMessage<User>> {
        try {
            let data = await this.userDao.getUserInfo(userId)
            return responseData(0,data,resCode[0])
        }catch {
            return responseData(500,new User(),resCode[500])
        }
        return Promise.resolve(undefined);
    }

    async getAllUser(): Promise<resMessage<User[]>> {
        try {
            let data = await this.userDao.getAllUser()
            return responseData(0,data,resCode[0])
        }catch {
            return responseData(500,[],resCode[500])
        }
    }

    async getAllUserAndRoles(): Promise<resMessage<User[]>> {
        try {
            let data = await this.userDao.getAllUserAndRoles()
            return responseData(0,data,resCode[0])
        }catch {
            return responseData(500,[],resCode[500])
        }
    }

    async addUserRoles(userId: number, roleId: number): Promise<resMessage<string>> {
        try {
            let data = await this.userDao.addUserRoles(userId,roleId)
            return responseData(0,'添加成功',resCode[0])
        }catch {
            return responseData(500,'插入失败',resCode[500])
        }
    }

    async removeUserRole(userId: number, roleId: number): Promise<resMessage<string>> {
        try {
            let data = await this.userDao.removeUserRole(userId,roleId)
            return responseData(0,'删除成功',resCode[0])
        }catch {
            return responseData(500,'删除失败',resCode[500])
        }
    }

    async removeUser(userId: number): Promise<resMessage<string>> {
        try {
            let data = await this.removeUserAllRoles(userId)
            await this.userDao.removeUser(userId)
            return responseData(0,'删除成功',resCode[0])
        }catch {
            return responseData(500,'删除失败',resCode[500])
        }
    }

    async removeUserAllRoles(userId: number): Promise<resMessage<string>> {
        try {
            let data = await this.userDao.removeUserAllRoles(userId)
            return responseData(0,'删除成功',resCode[0])
        }catch {
            return responseData(500,'删除失败',resCode[500])
        }
    }

    async addUser(user: User): Promise<resMessage<string>> {
        try {
            let data = await this.userDao.addUser(user)
            return responseData(0,'删除成功',resCode[0])
        }catch {
            return responseData(500,'删除失败',resCode[500])
        }
    }

    async getCountByUserName(username: string): Promise<resMessage<number>> {
        try {
            let data = await this.userDao.getCountByUserName(username)
            return responseData(0,data,resCode[0])
        }catch {
            return responseData(500,1,resCode[500])
        }
    }

    async updatePassword(user: User): Promise<resMessage<string>> {
        try {
            let data = await this.userDao.updatePassword(user)
            return responseData(0,'修改成功',resCode[0])
        }catch {
            return responseData(500,'修改失败',resCode[500])
        }
    }

}
