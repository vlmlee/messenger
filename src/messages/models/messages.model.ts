import { Field, Int, ObjectType, GraphQLISODateTime, InputType } from '@nestjs/graphql';

@InputType('MessageInput')
@ObjectType()
export class Message {
    @Field(type => Int)
    id: number;

    @Field(GraphQLISODateTime)
    createdAt: Date;

    @Field()
    content: string;
}
