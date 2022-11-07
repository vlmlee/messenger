import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './messages.service';
import { Message } from './models/messages.model';
import { NewMessage } from './models/newMessage.model';

@Resolver('Message')
export class MessageResolver {
    constructor(private readonly messageService: MessageService) {}

    @Query('getMessage')
    async getMessage(id: number): Promise<Message> {
        return this.messageService.getMessage(id);
    }

    @Query('getAllMessages')
    async getAllMessages(): Promise<Message[]> {
        return this.messageService.getAllMessages();
    }

    @Mutation('postMessage')
    async postMessage(input: NewMessage): Promise<Message> {
        return this.messageService.postMessage(input);
    }

    @Mutation('deleteMessage')
    async deleteMessage(@Args('id') id: number): Promise<Message> {
        return this.messageService.deleteMessage(id);
    }
}