import { Module } from '@nestjs/common';
import { MessageResolver } from './messages.resolver';
import { MessageService } from './messages.service';
import { PrismaService } from '../prisma.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './models/messages.entity';
import { NewMessage } from './models/newMessage.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Message, NewMessage])],
    providers: [MessageService, MessageResolver, PrismaService]
})
export class MessageModule {}
