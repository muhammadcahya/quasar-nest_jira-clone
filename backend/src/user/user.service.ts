import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto';
import { UpdateProjectDTO } from '../projects/dto';
import { ProjectEntity } from '../projects/entity/project.entity';
import * as bcrypt from 'bcrypt';
import { BoardEntity } from '../boards/entity/board.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>
  ) {}

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.users.findOne({ where: { email } });
  }
  async getByID(id: number): Promise<UserEntity> {
    return await this.users.findOne(id);
  }

  async create(payload: CreateUserDTO): Promise<UserEntity> {
    const isUserAlreadyExist = await this.users.findOne({ where: { email: payload.email } });
    // temporarily delete existing user to test
    if (isUserAlreadyExist) await this.users.delete(isUserAlreadyExist.id);
    // if (isUserAlreadyExist) throw new HttpException('USER_ALREADY_EXIST', HttpStatus.UNAUTHORIZED);

    const user = await this.users.create(payload);
    const createdUser = await this.users.save(user);
    // delete createdUser.password
    return createdUser;
  }

  async update(id: number, userData: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    const toUpdate = await this.users.findOneOrFail(id);
    const updated = { ...toUpdate, ...userData };
    await this.users.save(updated);
    return updated;
  }

  async setRefreshToken(id: number, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.users.update(id, {
      hashedRefreshToken,
    });
  }

  async getFavoriteProjects(id: number): Promise<ProjectEntity[]> {
    const user = await this.users.findOneOrFail(id, { relations: ['favoriteProjects'] });
    return user.favoriteProjects;
  }
  async getFavoriteBoards(id: number): Promise<BoardEntity[]> {
    const user = await this.users.findOneOrFail(id, { relations: ['favoriteBoards'] });
    return user.favoriteBoards;
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    const user = await this.users.findOne({ where: { username } });
    return Boolean(user);
  }
}
