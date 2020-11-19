import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Authority} from "../entity/authority.entity";
import {AuthInterfaceDao} from "../interface/interfaceDao/AuthInterfaceDao";
import {Roleauto} from "../entity/roleauto.entity";
import {Role} from "../entity/role.entity";

export class AuthDao implements AuthInterfaceDao {

    constructor(
        @InjectRepository(Authority)
        private readonly authRepository: Repository<Authority>,
    ) {}

    async getAuthByRoleId(roleId: number): Promise<Authority[]> {
        return await this.authRepository.createQueryBuilder('auth')
            .leftJoinAndSelect(Roleauto,'roleauto','roleauto.authId = auth.id')
            .where('roleauto.roleId = :roleId')
            .setParameters({roleId})
            .getMany()
    }

    async getAllAuth(): Promise<Authority[]> {
        return await this.authRepository.createQueryBuilder('auth')
            .getMany()
    }


}