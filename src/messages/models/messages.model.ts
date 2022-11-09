import { Field, GraphQLISODateTime, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('MessageInput')
@ObjectType()
export class Message {
    @Field(type => Int)
    id: number;

    @Field(GraphQLISODateTime)
    createdAt: Date;

    @Field()
    content: string;

    @Field(type => Int)
    userId: number;
}
