import {Role} from "../../entity/role.entity";
import {resMessage} from "../../../utils/resMessage";
import {Roleauto} from "../../entity/roleauto.entity";
import {DeleteResult} from "typeorm";

export interface RoleInterfaceService {

    //获取所有角色
    getAllRoles(): Promise<resMessage<Role[]>>

    //查询所有的角色及其权限
    getAllRolesAndAuth(): Promise<resMessage<Role[]>>

    //根据category查询当前角色的所有子角色的category
    getRoleCategoryByParentCategory(category: number): Promise<resMessage<number[]>>

    //添加角色
    addRole(role: Role) :Promise<resMessage<Role>>

    //判断当前角色及其子角色下是否有用户
    getUserIdByCategpry(category: number): Promise<resMessage<number[]>>

    //删除角色及其子角色
    removeRoles(category:number): Promise<resMessage<string>>

    //添加角色权限
    addRoleAuth(roleauto: Roleauto): Promise<resMessage<string>>

    //删除角色权限
    removeRoleAuth(roleauto: Roleauto): Promise<resMessage<string>>
}