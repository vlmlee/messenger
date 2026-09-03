import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './messages.service';
import { Message } from './entity/messages.entity';
import { NewMessage } from './dto/newMessage.dto';

@Resolver(of => Message)
export class MessageResolver {
    constructor(private readonly messageService: MessageService) {}

    @Query(returns => Message, { nullable: true })
    async getMessage(@Args('id', { type: () => Int }) id: number): Promise<Message | null> {
        return await this.messageService.getMessage(id);
    }

    @Query(returns => [Message])
    async getAllMessages(): Promise<Message[]> {
        return await this.messageService.getAllMessages();
    }

    @Query(returns => [Message])
    async getAllMessagesByUserId(
        @Args('userId', { type: () => Int }) userId: number
    ): Promise<Message[]> {
        return await this.messageService.getAllMessagesByUserId(userId);
    }

    @Mutation(returns => Message)
    async postMessage(@Args('message') message: NewMessage): Promise<Message> {
        return await this.messageService.postMessage(message);
    }

    @Mutation(returns => Message)
    async deleteMessage(@Args('id', { type: () => Int }) id: number): Promise<Message> {
        return await this.messageService.deleteMessage(id);
    }
}
