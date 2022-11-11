import { Field, GraphQLISODateTime, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class Channel {
    @Field(type => [Int])
    participants?: number[];
}
