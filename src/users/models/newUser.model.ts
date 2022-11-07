import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/models/messages.model';

@InputType('NewUserInput')
@ObjectType('NewUser')
export class NewUser {
    @Field({ nullable: true })
    name: string;

    @Field(type => [Message], { nullable: true })
    messages: Message[];
}
