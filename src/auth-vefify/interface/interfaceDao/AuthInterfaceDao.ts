import {Authority} from "../../entity/authority.entity";
import {Role} from "../../entity/role.entity";

export interface AuthInterfaceDao {

    //根据角色id获取当前角色所有权限
    getAuthByRoleId(roleId: number): Promise<Authority[]>

    //查询所有权限
    getAllAuth(): Promise<Authority[]>

}