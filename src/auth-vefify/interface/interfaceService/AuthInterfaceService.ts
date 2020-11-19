import {Authority} from "../../entity/authority.entity";
import {resMessage} from "../../../utils/resMessage";

export interface AuthInterfaceService {

    //根据角色id获取当前角色所有权限
    getAuthByRoleId(roleId: number): Promise<resMessage<Authority[]>>

    //查询所有权限
    getAllAuth(): Promise<resMessage<Authority[]>>

}