import { Field, InputType, Int } from '@nestjs/graphql';
import { Message } from '../../messages/models/messages.entity';

@InputType('NewUserInput')
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
