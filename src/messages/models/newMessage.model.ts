import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('NewMessageInput')
@ObjectType('NewMessage')
export class NewMessage {
    @Field()
    content: string;

    @Field(type => Int)
    fromUser?: number;

    @Field(type => Int)
    toUser?: number;
}
