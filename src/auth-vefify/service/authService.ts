import { Injectable } from '@nestjs/common';
import {resMessage} from '../../utils/resMessage'
import {responseData} from "../../utils/responseData";
import {resCode} from "../../utils/resCode";
import {fromtDatatolist} from "../../utils/dataFromtToList";
import {AuthInterfaceService} from "../interface/interfaceService/AuthInterfaceService";
import {AuthDao} from "../Dao/authDao";
import {Authority} from "../entity/authority.entity";

@Injectable()
export class authService implements AuthInterfaceService{

    constructor(private readonly authDao : AuthDao) {}

    async getAuthByRoleId(roleId: number): Promise<resMessage<Authority[]>>{
        try {
            let data = await this.authDao.getAuthByRoleId(roleId)
            let auths = fromtDatatolist(data)
            return responseData(0,auths,resCode[0])
        }catch {
            return responseData(500,[],resCode[500])
        }
    }

    async getAllAuth(): Promise<resMessage<Authority[]>> {
        try {
            let data = await this.authDao.getAllAuth()
            let auths = fromtDatatolist(data)
            return responseData(0,auths,resCode[0])
        }catch {
            return responseData(500,[],resCode[500])
        }
    }


}
