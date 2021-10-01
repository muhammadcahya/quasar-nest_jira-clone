import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IssuesController } from './issues.controller';
import { IssueEntity } from './entity/issue.entity';
import { IssuesService } from './issues.service';
import { IssuesGateway } from './issues.gateway';

import { UserModule } from '../user/user.module';
import { CommentEntity } from './entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IssueEntity, CommentEntity]), UserModule],
  controllers: [IssuesController],
  providers: [IssuesService, IssuesGateway],
})
export class IssuesModule {}
