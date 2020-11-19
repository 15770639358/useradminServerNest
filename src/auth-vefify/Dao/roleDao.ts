import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, InsertResult, Repository} from "typeorm";
import {Role} from "../entity/role.entity";
import {RoleInterfaceDao} from "../interface/interfaceDao/RoleInterfaceDao";
import {Roleauto} from "../entity/roleauto.entity";
import {Authority} from "../entity/authority.entity";
import {Userrole} from "../entity/userrole.entity";

export class RoleDao implements RoleInterfaceDao {

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    //获取所有角色
    async getAllRoles(): Promise<Role[]> {
        return await this.roleRepository.find()
    }

    //查询所有角色及其权限
    async getAllRoleAndAuth(): Promise<Role[]> {
        //SELECT r.*, au.id as authId, au.authpath, au.authname, au.category from role r, roleauto ra, authority au where r.id = ra.roleId and ra.authId= au.id
        return await this.roleRepository.createQueryBuilder('role')
            .leftJoinAndMapMany('role.roleauth',Roleauto,'roleauto','role.id = roleauto.roleId')
            .leftJoinAndMapMany('role.auths',Authority,'auth','roleauto.authId = auth.id')
            .select(['role','auth'])
            .getMany()
    }

    async getRoleCategoryByParentCategory(category: number): Promise<number[]> {
        return await this.roleRepository
            .createQueryBuilder("role")
            .select(['role.category'])
            .where('role.category like :category',{category: category+'__'})
            .getRawMany();
    }

    async addRole(role: Role): Promise<Role> {
        return await this.roleRepository.save<Role>(role)
    }

    //    select id from userrole where roleId in (select id from role where category like ?)
    async getUserIdByCategpry(category: number): Promise<number[]> {
        return await this.roleRepository.query('select userId from userrole where roleId in (select id from role where category like ?)',[category+'%'])
    }

    async removeRoles(category: number):  Promise<DeleteResult> {
        return await  this.roleRepository
            .createQueryBuilder()
            .delete()
            .from(Role)
            .where("category like :category", { category: category+'%' })
            .execute();
    }

    //select id from role where category like ?
    async getAllRolesIdByCategory(category: number): Promise<number[]> {
        return await this.roleRepository
            .createQueryBuilder('role')
            .select(['role.id'])
            .where('role.category like :category',{category: category+'%'})
            .getRawMany()
    }

    async deleteAllRoleByRoleId(roleId: number): Promise<DeleteResult> {
        return await  this.roleRepository
            .createQueryBuilder()
            .delete()
            .from(Roleauto)
            .where("roleId = :roleId", { roleId })
            .execute();
    }

    async addRoleAuth(roleauto: Roleauto): Promise<InsertResult> {
        console.log(roleauto);
        return await this.roleRepository
            .createQueryBuilder()
            .insert()
            .into(Roleauto)
            .values([{roleId: roleauto.roleId, authId: roleauto.authId}])
            .execute();
    }

    async removeRoleAuth(roleauto: Roleauto): Promise<DeleteResult> {
        return await this.roleRepository
            .createQueryBuilder()
            .delete()
            .from(Roleauto)
            .where("roleId = :roleId and authId = :authId", { roleId: roleauto.roleId,authId: roleauto.authId })
            .execute();
    }


}