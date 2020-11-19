import {User} from "../../entity/user.entity";
import {resMessage} from "../../../utils/resMessage";
import {DeleteResult, InsertResult, UpdateResult} from "typeorm";

export interface UserInterfaceDao {
    //登录
    login (user: User):  Promise<User>

    //获取用户信息
    getUserInfo(userId: number): Promise<User>

    //查询所有用户
    getAllUser(): Promise<User[]>

    //查询所有用户及其角色
    getAllUserAndRoles(): Promise<User[]>

    //添加用户的角色
    addUserRoles(userId: number, roleId: number): Promise<InsertResult>

    //删除用户角色
    removeUserRole(userId: number, roleId: number): Promise<DeleteResult>

    //删除用户
    removeUser(userId: number): Promise<DeleteResult>

    //删除用户所有角色
    removeUserAllRoles(userId: number): Promise<DeleteResult>

    //添加用户
    addUser(user: User): Promise<User>

    //查询当前用户名的个数
    getCountByUserName(username:string): Promise<number>

    //修改密码
    updatePassword(user:User): Promise<UpdateResult>


}