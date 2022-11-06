import { Resolver, ResolveField, Args, Query, Int, Parent } from '@nestjs/graphql';
import { User } from './models/users.model';

@Resolver(of => User)
export class UsersResolver {
    constructor(private usersService: UsersService, private messagesService: MessagesService) {}

    @Query(returns => User)
    async user(@Args('id', { type: () => Int }) id: number) {
        return this.usersService.findOneById(id);
    }

    @ResolveField()
    async messages(@Parent() user: User) {
        const { id } = user;
        return this.messagesService.findAll({ userId: id });
    }
}
