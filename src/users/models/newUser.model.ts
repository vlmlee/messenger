import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/models/messages.model';
import { Friend } from './friend.model';

@InputType('NewUserInput')
@ObjectType('NewUser')
export class NewUser {
    @Field({ nullable: true })
    name: string;

    @Field(() => [Message])
    messages?: Message[];

    @Field(() => [Friend])
    friends?: Friend[];
}
