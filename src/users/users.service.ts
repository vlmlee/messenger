import { PrismaService } from '../prisma.service';
import { User } from './entity/users.entity';
import { NewUser } from './entity/newUser.dto';
import { Injectable } from '@nestjs/common';
import { ChannelService } from '../channels/channels.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private channelService: ChannelService) {}

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany({});
    }

    async getUser(id: number): Promise<User> {
        return this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }

    async addUser(user: NewUser): Promise<User> {
        return this.prisma.user.create({
            data: {
                name: user.name,
                messagesFrom: {
                    create: user.messagesFrom ?? []
                },
                friends: []
            }
        });
    }

    async addChannelToUser(): Promise<User> {
        return this.channelService.createChannel();
    }
}
