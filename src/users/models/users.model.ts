import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/models/messages.model';

@ObjectType()
export class User {
    @Field(type => Int)
    id: number;

    @Field({ nullable: true })
    name: string;

    @Field(type => [Message])
    messages: Message[];
}
