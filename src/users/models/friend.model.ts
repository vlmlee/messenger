import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Friend {
    @Field(type => Int)
    id: number;

    @Field(type => Int)
    userId: number;
}
