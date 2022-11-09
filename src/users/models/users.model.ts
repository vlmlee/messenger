import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/models/messages.model';

@ObjectType()
export class User {
    @Field(type => Int)
    id: number;

    @Field(GraphQLISODateTime)
    createdAt: Date;

    @Field({ nullable: true })
    name: string;

    @Field(type => [Message], { nullable: true })
    messagesFrom?: Message[];

    @Field(type => [Int], { nullable: true })
    friends?: number[];
}
