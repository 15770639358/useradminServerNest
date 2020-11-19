import {Role} from "../../entity/role.entity";
import {DeleteResult, InsertResult} from "typeorm";
import {Roleauto} from "../../entity/roleauto.entity";

export interface RoleInterfaceDao {

    //查询所有角色
    getAllRoles(): Promise<Role[]>

    //查询所有角色及其权限
    getAllRoleAndAuth(): Promise<Role[]>

    //根据category查询当前角色的所有子角色的category
    getRoleCategoryByParentCategory(category: number): Promise<number[]>

    //添加角色
    addRole(role: Role) :Promise<Role>

    //判断当前角色及其子角色下是否有用户
    getUserIdByCategpry(category: number): Promise<number[]>

    //删除角色及其子角色
    removeRoles(category:number): Promise<DeleteResult>

    //查询当前角色及其所有子角色的id
    getAllRolesIdByCategory(category:number): Promise<number[]>

    //删除当前角色下单所有权限
    deleteAllRoleByRoleId(roleId:number): Promise<DeleteResult>

    //添加角色权限
    addRoleAuth(roleauto: Roleauto): Promise<InsertResult>

    //删除角色权限
    removeRoleAuth(roleauto: Roleauto): Promise<DeleteResult>
}