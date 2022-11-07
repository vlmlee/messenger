import { Resolver, ResolveField, Args, Query, Int, Parent } from '@nestjs/graphql';
import { User } from './models/users.model';
import { MessageService } from '../messages/messages.service';
import { UserService } from '../users/users.service';

@Resolver(of => User)
export class UserResolver {
    constructor(private usersService: UserService, private messageService: MessageService) {}

    @Query(returns => User)
    async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
        return this.usersService.getUser(id);
    }

    @ResolveField()
    async messages(@Parent() user: User) {
        const { id } = user;
        return this.messageService.getAllMessagesByUserId(id);
    }
}
