import { Field, InputType, Int } from '@nestjs/graphql';

@InputType('NewMessageInput')
export class NewMessage {
    @Field()
    content: string;

    @Field(type => Int)
    fromUser?: number;

    @Field(type => Int)
    toUser?: number;
}
