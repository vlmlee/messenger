import { PrismaService } from '../prisma.service';
import { User } from './models/users.model';
import { NewUser } from './models/newUser.model';

export class UserService {
    constructor(private prisma: PrismaService) {}

    async getUser(id: number): Promise<User> {
        return this.prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                messages: true
            }
        });
    }

    async addUser(user: NewUser): Promise<User> {
        return this.prisma.user.create({
            data: {
                name: user.name,
                messages: null
            }
        });
    }
}
