import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

import { Public } from '../auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicFileEntity } from '../files/entity/public-file.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('self')
  async getSelf(@Request() req): Promise<UserEntity> {
    return await this.userRepository.getByID(req.user.id);
  }

  @ApiBearerAuth()
  @Get(':id')
  async getByID(@Param('id') id: number): Promise<UserEntity> {
    return await this.userRepository.getByID(id);
  }
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.update(id, payload);
  }

  @ApiBearerAuth()
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Request() req): Promise<PublicFileEntity> {
    return await this.userRepository.setUserImage(file, 'avatar', req.user.id);
  }

  @ApiBearerAuth()
  @Post('header')
  @UseInterceptors(FileInterceptor('file'))
  async uploadHeader(@UploadedFile() file: Express.Multer.File, @Request() req): Promise<PublicFileEntity> {
    return await this.userRepository.setUserImage(file, 'header', req.user.id);
  }
  @ApiBearerAuth()
  @Delete('header')
  async deleteHeader(@Request() req): Promise<void> {
    return await this.userRepository.deleteUserImage('header', req.user.id);
  }

  @Public()
  @Get('is-taken')
  async isUsernameTaken(@Query('username') username: string): Promise<boolean> {
    return await this.userRepository.isUsernameTaken(username);
  }
}
