import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/models/messages.model';

@ObjectType()
export class NewUser {
    @Field({ nullable: true })
    name: string;

    @Field(type => [Message], { nullable: true })
    messages: Message[];
}
