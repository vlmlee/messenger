import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';
import { PrismaService } from '../prisma.service';
import { MessageService } from '../messages/messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { NewUser } from './dto/newUser.dto';

@Module({
    imports: [TypeOrmModule.forFeature([User, NewUser])],
    providers: [UserService, UserResolver, PrismaService, MessageService]
})
export class UserModule {}
