import { Field, InputType } from '@nestjs/graphql';
import { Message } from '../../messages/models/messages.model';

@InputType()
export class NewUser {
    @Field({ nullable: true })
    name: string;

    @Field(type => [Message], { nullable: true })
    messages: Message[];
}
