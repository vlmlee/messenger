import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('FriendInput')
@ObjectType()
export class Friend {
    @Field(type => Int)
    id: number;

    @Field(type => Int)
    userId: number;
}
