import { Module } from '@nestjs/common';
import { ChannelResolver } from './channels.resolver';
import { ChannelService } from './channels.service';
import { PrismaService } from '../prisma.service';

@Module({
    providers: [ChannelService, ChannelResolver, PrismaService]
})
export class UserModule {}
