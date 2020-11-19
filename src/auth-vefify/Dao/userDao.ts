import {UserInterfaceDao} from "../interface/interfaceDao/UserInterfaceDao";
import {User} from "../entity/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, InsertQueryBuilder, InsertResult, Repository, UpdateResult} from "typeorm";
import {Userrole} from "../entity/userrole.entity";
import {Role} from "../entity/role.entity";

export class UserDao implements UserInterfaceDao {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    //登录
    async  login(user: User): Promise<User> {
        return await this.userRepository.createQueryBuilder('user')
            .where('user.username = :username and user.password = :password')
            .setParameters({username: user.username, password: user.password})
            .getOne()
    }

    //获取用户信息
    async getUserInfo(userId: number): Promise<User> {
        return await this.userRepository.createQueryBuilder('user')
            .leftJoinAndMapMany('user.userRoles',Userrole,'userRole','user.id = userRole.userId')
            .leftJoinAndMapMany('user.roles',Role,'role','userRole.roleId = role.id')
            .select(["user.id", "user.username",'role.id', 'role.rolename'])
            .where('user.id = :userId')
            .setParameters({userId})
            .getOne()
    }

    async getAllUser(): Promise<User[]> {
        return await this.userRepository.createQueryBuilder('user')
            .select(['user.id','user.username'])
            .getMany()
    }

    async getAllUserAndRoles(): Promise<User[]> {
        return await this.userRepository.createQueryBuilder('user')
            .leftJoinAndMapMany('user.userRoles',Userrole,'userRole','user.id = userRole.userId')
            .leftJoinAndMapMany('user.roles',Role,'role','userRole.roleId = role.id')
            .select(['user','role'])
            .getMany()
    }

    async addUserRoles(userId: number, roleId: number): Promise<InsertResult> {
        return await this.userRepository
            .createQueryBuilder()
            .insert()
            .into(Userrole)
            .values([{userId, roleId}])
            .execute();
    }

    async removeUserRole(userId: number, roleId: number): Promise<DeleteResult> {
        return  await this.userRepository
            .createQueryBuilder()
            .delete()
            .from(Userrole)
            .where("userId = :userId and roleId = :roleId", { userId,roleId })
            .execute();
    }

    async removeUser(userId: number): Promise<DeleteResult> {
        return  await this.userRepository
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :userId", { userId })
            .execute();
    }

    async removeUserAllRoles(userId: number): Promise<DeleteResult> {
        return  await this.userRepository
            .createQueryBuilder()
            .delete()
            .from(Userrole)
            .where("userId = :userId", { userId })
            .execute();
    }

    async addUser(user: User): Promise<User> {
        //e10adc3949ba59abbe56e057f20f883e 123456
        user.password = 'e10adc3949ba59abbe56e057f20f883e';
        return await this.userRepository.save<User>(user)
    }

    async getCountByUserName(username: string): Promise<number> {
        return await this.userRepository
            .createQueryBuilder("user")
            .select("count(1)", "count")
            .where("user.username = :username", { username })
            .getRawOne();
    }

    async updatePassword(user: User): Promise<UpdateResult> {
        return await this.userRepository
            .createQueryBuilder('user')
            .update(User)
            .set({ password: user.password })
            .where("id = :id", { id: user.id })
            .execute();
    }


}