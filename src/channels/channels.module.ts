import { Module } from '@nestjs/common';
import { ChannelResolver } from './channels.resolver';
import { ChannelService } from './channels.service';
import { PrismaService } from '../prisma.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './models/channels.model';

@Module({
    imports: [TypeOrmModule.forFeature([Channel])],
    providers: [ChannelService, ChannelResolver, PrismaService]
})
export class UserModule {}
