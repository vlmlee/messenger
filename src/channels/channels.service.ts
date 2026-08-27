import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Channel } from './entity/channels.entity';

@Injectable()
export class ChannelService {
    constructor(private prisma: PrismaService) {}

    async getAllChannels(): Promise<Channel[]> {
        return this.prisma.channel.findMany();
    }

    async createChannel(createdBy: number): Promise<Channel> {
        if (!createdBy) {
            throw new Error('User is required');
        }

        return this.prisma.channel.create({
            data: {
                createdBy: createdBy,
                participants: [createdBy]
            }
        });
    }

    async removeChannel(id: number): Promise<void> {
        await this.prisma.channel.delete({
            where: {
                id: id
            }
        });
    }

    async joinChannel(id: number, userId: number): Promise<Channel> {
        const channel = await this.prisma.channel.findUnique({
            where: {
                id: id
            }
        });
        if (!channel) {
            throw new Error('Channel not found');
        }

        const participants = channel.participants;

        return this.prisma.channel.update({
            where: {
                id: id
            },
            data: {
                participants: [...participants, userId]
            }
        });
    }

    async leaveChannel(id: number, userId: number): Promise<Channel> {
        const channel = await this.prisma.channel.findUnique({
            where: {
                id: id
            }
        });
        if (!channel) {
            throw new Error('Channel not found');
        }

        const participants = channel.participants;
        const newParticipants = participants.filter(participant => participant !== userId);

        return this.prisma.channel.update({
            where: {
                id: id
            },
            data: {
                participants: newParticipants
            }
        });
    }
}
