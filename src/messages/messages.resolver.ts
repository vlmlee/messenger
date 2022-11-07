import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MessageService } from './messages.service';
import { Message } from './models/messages.model';
import { NewMessage } from './models/newMessage.model';

@Resolver(of => Message)
export class MessageResolver {
    constructor(private readonly messageService: MessageService) {}

    @Query(returns => Message)
    async getMessage(@Args('id', { type: () => Int }) id: number): Promise<Message> {
        return this.messageService.getMessage(id);
    }

    @Query(returns => [Message])
    async getAllMessages(): Promise<Message[]> {
        return this.messageService.getAllMessages();
    }

    @Mutation(returns => Message)
    async postMessage(@Args('input') input: NewMessage): Promise<Message> {
        return this.messageService.postMessage(input);
    }

    @Mutation(returns => Message)
    async deleteMessage(@Args('id') id: number): Promise<Message> {
        return this.messageService.deleteMessage(id);
    }
}
