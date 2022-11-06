import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
    @Field(type => Int)
    id: number;

    @Field()
    content: string;
}
