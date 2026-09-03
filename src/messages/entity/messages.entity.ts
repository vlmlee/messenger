import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
    @Field(type => Int)
    id: number;

    @Field(type => GraphQLISODateTime)
    createdAt: Date;

    @Field()
    content: string;

    @Field(type => Int)
    fromUser: number;

    @Field(type => Int)
    toUser: number;
}
