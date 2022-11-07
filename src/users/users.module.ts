import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';
import { PrismaService } from '../prisma.service';

@Module({
    providers: [UserService, UserResolver, PrismaService]
})
export class UserModule {}
