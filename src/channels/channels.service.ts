import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Channel } from './entity/channels.entity';

@Injectable()
export class ChannelService {
    constructor(private prisma: PrismaService) {}

    async getAllChannels(): Promise<Channel[]> {
        return this.prisma.channel.findMany();
    }

    async getChannel(id: number): Promise<Channel | null> {
        return this.prisma.channel.findUnique({
            where: { id }
        });
    }

    async createChannel(createdBy: number): Promise<Channel> {
        if (!createdBy) {
            throw new Error('User is required');
        }

        const user = await this.prisma.user.findUnique({
            where: { id: createdBy }
        });
        if (!user) {
            throw new Error('User not found');
        }

        const channel = await this.prisma.channel.create({
            data: {
                createdBy,
                participants: [createdBy]
            }
        });

        await this.prisma.user.update({
            where: { id: createdBy },
            data: {
                channelsOwn: [...(user.channelsOwn || []), channel.id],
                channelsParticipatingIn: [...(user.channelsParticipatingIn || []), channel.id]
            }
        });

        return channel;
    }

    async removeChannel(id: number): Promise<Channel> {
        const channel = await this.prisma.channel.findUnique({
            where: { id }
        });
        if (!channel) {
            throw new Error('Channel not found');
        }

        const participants = channel.participants || [];
        for (const userId of participants) {
            const user = await this.prisma.user.findUnique({
                where: { id: userId }
            });
            if (!user) continue;

            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    channelsOwn: (user.channelsOwn || []).filter(channelId => channelId !== id),
                    channelsParticipatingIn: (user.channelsParticipatingIn || []).filter(
                        channelId => channelId !== id
                    )
                }
            });
        }

        return this.prisma.channel.delete({
            where: { id }
        });
    }

    async joinChannel(id: number, userId: number): Promise<Channel> {
        const channel = await this.prisma.channel.findUnique({
            where: { id }
        });
        if (!channel) {
            throw new Error('Channel not found');
        }

        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            throw new Error('User not found');
        }

        const participants = channel.participants || [];
        if (participants.includes(userId)) {
            return channel;
        }

        const updatedChannel = await this.prisma.channel.update({
            where: { id },
            data: {
                participants: [...participants, userId]
            }
        });

        await this.prisma.user.update({
            where: { id: userId },
            data: {
                channelsParticipatingIn: [...(user.channelsParticipatingIn || []), id]
            }
        });

        return updatedChannel;
    }

    async leaveChannel(id: number, userId: number): Promise<Channel> {
        const channel = await this.prisma.channel.findUnique({
            where: { id }
        });
        if (!channel) {
            throw new Error('Channel not found');
        }

        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            throw new Error('User not found');
        }

        const updatedChannel = await this.prisma.channel.update({
            where: { id },
            data: {
                participants: (channel.participants || []).filter(participant => participant !== userId)
            }
        });

        await this.prisma.user.update({
            where: { id: userId },
            data: {
                channelsParticipatingIn: (user.channelsParticipatingIn || []).filter(
                    channelId => channelId !== id
                ),
                channelsOwn: (user.channelsOwn || []).filter(channelId => channelId !== id)
            }
        });

        return updatedChannel;
    }
}
