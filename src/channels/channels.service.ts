import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Channel } from './entity/channels.entity';

@Injectable()
export class ChannelService {
    constructor(private prisma: PrismaService) {}

    async createChannel(userId: number): Promise<Channel> {
        return this.prisma.channel.create({
            data: {
                userId: 0
            }
        });
    }

    async removeChannel(id: number): Promise<Channel> {
        return this.prisma.channel.delete({
            where: {
                id: id
            }
        });
    }

    async joinChannel(id: number, userId: number): Promise<Channel> {
        return this.prisma.channel.update({
            where: {
                id: id
            },
            data: {
                participants: {
                    push: userId
                }
            }
        });
    }
}
