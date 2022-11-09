import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/models/messages.model';
import { Friend } from './friend.model';

@ObjectType()
export class User {
    @Field(type => Int)
    id: number;

    @Field(GraphQLISODateTime)
    createdAt: Date;

    @Field({ nullable: true })
    name: string;

    @Field(type => [Message])
    messages?: Message[];

    @Field(type => [Friend])
    friends?: Friend[];
}
