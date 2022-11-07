import { Resolver, ResolveField, Args, Query, Int, Parent, Mutation } from '@nestjs/graphql';
import { User } from './models/users.model';
import { MessageService } from '../messages/messages.service';
import { UserService } from './users.service';
import { NewUser } from './models/newUser.model';

@Resolver(of => User)
export class UserResolver {
    constructor(private userService: UserService, private messageService: MessageService) {}

    @Query(returns => User)
    async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
        return this.userService.getUser(id);
    }

    @ResolveField()
    async messages(@Parent() user: User) {
        const { id } = user;
        return this.messageService.getAllMessagesByUserId(id);
    }

    @Mutation(returns => User)
    async createUser(user: NewUser): Promise<User> {
        return this.userService.addUser(user);
    }
}
