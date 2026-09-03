import { PrismaService } from '../prisma.service';
import { User } from './entity/users.entity';
import { NewUser } from './dto/newUser.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async getUser(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async createUser(user: NewUser): Promise<User> {
        return this.prisma.user.create({
            data: {
                name: user.name
            }
        });
    }
}
