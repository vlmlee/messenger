import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/models/messages.model';

@InputType('NewUserInput')
@ObjectType('NewUser')
export class NewUser {
    @Field(type => Int, { nullable: true })
    id?: number;

    @Field({ nullable: true })
    name: string;

    @Field(() => [Message], { nullable: true })
    messagesTo?: Message[];

    @Field(() => [Int], { nullable: true })
    friends?: number[];
}
