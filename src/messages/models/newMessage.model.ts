import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';

@InputType('NewMessageInput')
@ObjectType('NewMessage')
export class NewMessage {
    @Field()
    content: string;

    @Field(Int)
    userId: number;
}
