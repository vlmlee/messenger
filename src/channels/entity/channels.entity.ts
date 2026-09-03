import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Channel {
    @Field(type => Int)
    id: number;

    @Field(type => Int)
    createdBy: number;

    @Field(type => [Int])
    participants: number[];
}
