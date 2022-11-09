import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/models/messages.model';
import { Friend } from './friend.model';

@InputType('NewUserInput')
@ObjectType('NewUser')
export class NewUser {
    @Field(type => Int, { nullable: true })
    id?: number;

    @Field({ nullable: true })
    name: string;

    @Field(() => [Message], { nullable: true })
    messagesTo?: Message[];

    @Field(() => [Friend], { nullable: true })
    friends?: Friend[];
}
