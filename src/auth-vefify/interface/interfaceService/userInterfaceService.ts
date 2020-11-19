import {User} from "../../entity/user.entity";
import {resMessage} from "../../../utils/resMessage";
import {DeleteResult, UpdateResult} from "typeorm";

export interface UserInterfaceServive {
    // 登录
    login(user: User): Promise<resMessage<User>>

    //获取登录用户信息
    getUserInfo(userId: number): Promise<resMessage<User>>

    //查询所有用户
     getAllUser(): Promise<resMessage<User[]>>

    //查询所有用户及其角色
    getAllUserAndRoles(): Promise<resMessage<User[]>>

    //添加用户的角色
    addUserRoles(userId: number, roleId: number): Promise<resMessage<string>>

    //删除用户角色
    removeUserRole(userId: number, roleId: number): Promise<resMessage<string>>

    //删除用户
    removeUser(userId: number): Promise<resMessage<string>>

    //删除用户所有角色
    removeUserAllRoles(userId: number): Promise<resMessage<string>>

    //添加用户
    addUser(user: User): Promise<resMessage<string>>

    //查询当前用户名的个数
    getCountByUserName(username:string): Promise<resMessage<number>>

    //修改密码
    updatePassword(user:User): Promise<resMessage<string>>

}