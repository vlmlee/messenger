import { Module } from '@nestjs/common';
import { MessageResolver } from './messages.resolver';
import { MessageService } from './messages.service';
import { PrismaService } from '../prisma.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './models/messages.model';
import { NewMessage } from './models/newMessage.model';

@Module({
    imports: [TypeOrmModule.forFeature([Message, NewMessage])],
    providers: [MessageService, MessageResolver, PrismaService]
})
export class MessageModule {}
