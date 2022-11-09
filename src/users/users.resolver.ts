import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './models/users.model';
import { MessageService } from '../messages/messages.service';
import { UserService } from './users.service';
import { NewUser } from './models/newUser.model';

@Resolver(of => User)
export class UserResolver {
    constructor(private userService: UserService, private messageService: MessageService) {}

    @Query(returns => [User])
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Query(returns => User)
    async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
        return this.userService.getUser(id);
    }

    @ResolveField()
    async messagesFrom(@Parent() user: User) {
        const { id } = user;
        return this.messageService.getAllMessagesByUserId(id);
    }

    @Mutation(returns => User)
    async createUser(@Args('user') user: NewUser): Promise<User> {
        return this.userService.addUser(user);
    }
}
