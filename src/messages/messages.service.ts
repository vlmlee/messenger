import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Message } from './models/messages.model';
import { NewMessage } from './models/newMessage.model';

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {}

    async getMessage(id: number): Promise<Message | null> {
        return await this.prisma.message.findUnique({
            where: {
                id: id
            }
        });
    }

    async getAllMessages(): Promise<Message[]> {
        return await this.prisma.message.findMany({});
    }

    async getAllMessagesByUserId(userId: number): Promise<Message[]> {
        return await this.prisma.message.findMany({
            where: {
                fromUser: userId
            }
        });
    }

    async postMessage(input: NewMessage): Promise<Message> {
        return await this.prisma.message.create({
            data: input
        });
    }

    async deleteMessage(id: number): Promise<Message> {
        return await this.prisma.message.delete({
            where: {
                id: id
            }
        });
    }
}
