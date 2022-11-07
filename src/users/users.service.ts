import { PrismaService } from '../prisma.service';
import { User } from './models/users.model';

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
}
