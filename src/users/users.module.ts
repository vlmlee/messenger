import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';
import { PrismaService } from '../prisma.service';
import { MessageService } from '../messages/messages.service';

@Module({
    providers: [UserService, UserResolver, PrismaService, MessageService]
})
export class UserModule {}
