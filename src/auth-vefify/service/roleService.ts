import { Injectable } from '@nestjs/common';
import {resMessage} from '../../utils/resMessage'
import {responseData} from "../../utils/responseData";
import {resCode} from "../../utils/resCode";
import {RoleDao} from "../Dao/roleDao";
import {RoleInterfaceService} from "../interface/interfaceService/RoleInterfaceService";
import {Role} from "../entity/role.entity";
import {fromtDatatolist} from "../../utils/dataFromtToList";
import {Roleauto} from "../entity/roleauto.entity";
import {DeleteResult, InsertResult} from "typeorm";

@Injectable()
export class roleService implements RoleInterfaceService{

    constructor(private readonly roleDao : RoleDao) {}


    async getAllRoles(): Promise<resMessage<Role[]>> {
        try {
            let data = await this.roleDao.getAllRoles()
            let roles = fromtDatatolist(data)
            return responseData(0,roles,resCode[0])
        }catch {
            return responseData(500,[],resCode[500])
        }
    }

    async getAllRolesAndAuth(): Promise<resMessage<Role[]>> {
        try {
            let data = await this.roleDao.getAllRoleAndAuth()
            return responseData(0,data,resCode[0])
        }catch {
            return responseData(500,[],resCode[500])
        }
    }

    async getRoleCategoryByParentCategory(category: number): Promise<resMessage<number[]>> {
        try {
            let data = await this.roleDao.getRoleCategoryByParentCategory(category)
            return responseData(0,data,resCode[0])
        }catch {
            return responseData(500,[],resCode[500])
        }
    }

    async addRole(role: Role): Promise<resMessage<Role>> {
        try {
            let {data} = await this.getRoleCategoryByParentCategory(role.category)
            let addCategory = null
            let categs = []
            data.forEach(categ => {
                categs.push(categ['role_category'])
            })
            categs = categs.sort( (a,b) => {
                return b-a
            })
            if(categs.length > 0){
                addCategory = categs[0] + 1
            }else {
                addCategory = role.category * 100 + 10
            }
            role.category = addCategory
            let rerole = await this.roleDao.addRole(role)
            return responseData(0,rerole,resCode[0])
        }catch {
            return responseData(500,new Role(),resCode[500])
        }
    }

    async getUserIdByCategpry(category: number): Promise<resMessage<number[]>> {
        try {
            let data = await this.roleDao.getUserIdByCategpry(category)
            return responseData(0,data,resCode[0])
        }catch {
            return responseData(500,[],resCode[500])
        }
    }

    async removeRoles(category: number): Promise<resMessage<string>> {
        try {
            let {data} = await this.getUserIdByCategpry(category)
            if(data.length !== 0){
                return responseData(3,'当前角色及其子角色下含有用户，不可删除',resCode[3])
            }
            let ids = await this.roleDao.getAllRolesIdByCategory(category)
            console.log(ids);
            for (const categ of ids) {
                await this.roleDao.deleteAllRoleByRoleId(categ['role_id'])
            }
            await  this.roleDao.removeRoles(category)
            // let data = await roleDaos.removeRole(category+'%')
            return responseData(0,'删除成功',resCode[0])
        }catch {
            return responseData(500,'[]',resCode[500])
        }
    }

    async addRoleAuth(roleauto: Roleauto): Promise<resMessage<string>> {
        try {
            let data = await this.roleDao.addRoleAuth(roleauto)
            return responseData(0,'添加成功',resCode[0])
        }catch {
            return responseData(500,'添加失败',resCode[500])
        }
    }

    async removeRoleAuth(roleauto: Roleauto): Promise<resMessage<string>> {
        try {
            let data = await this.roleDao.removeRoleAuth(roleauto)
            return responseData(0,'删除成功',resCode[0])
        }catch {
            return responseData(500,'删除失败',resCode[500])
        }
    }



}
