import { Module } from '@nestjs/common';
import { MessageResolver } from './messages.resolver';
import { MessageService } from './messages.service';
import { PrismaService } from '../prisma.service';

@Module({
    providers: [MessageService, MessageResolver, PrismaService]
})
export class MessageModule {}
