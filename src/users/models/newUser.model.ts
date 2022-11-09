import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/models/messages.model';

@InputType('NewUserInput')
@ObjectType('NewUser')
export class NewUser {
    @Field(type => Int, { nullable: true })
    id?: number;

    @Field({ nullable: true })
    name: string;

    @Field(type => [Message], { nullable: true })
    messagesFrom?: Message[];

    @Field(type => [Int], { nullable: true })
    friends?: number[];
}
