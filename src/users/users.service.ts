import { PrismaService } from '../prisma.service';
import { User } from './models/users.model';
import { NewUser } from './models/newUser.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

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
}
