import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './messages.service';
import { Message } from './entity/messages.entity';
import { NewMessage } from './entity/newMessage.dto';

@Resolver(of => Message)
export class MessageResolver {
    constructor(private readonly messageService: MessageService) {}

    @Query(returns => Message)
    async getMessage(@Args('id', { type: () => Int }) id: number): Promise<Message> {
        return await this.messageService.getMessage(id);
    }

    @Query(returns => [Message])
    async getAllMessages(): Promise<Message[]> {
        return await this.messageService.getAllMessages();
    }

    @Mutation(returns => Message)
    async postMessage(@Args('input') input: NewMessage): Promise<Message> {
        return await this.messageService.postMessage(input);
    }

    @Mutation(returns => Message)
    async deleteMessage(@Args('id') id: number): Promise<Message> {
        return await this.messageService.deleteMessage(id);
    }
}
