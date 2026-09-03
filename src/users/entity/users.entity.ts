import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/entity/messages.entity';

@ObjectType()
export class User {
    @Field(type => Int)
    id: number;

    @Field(type => GraphQLISODateTime)
    createdAt: Date;

    @Field({ nullable: true })
    name?: string;

    @Field(type => [Int], { nullable: true, defaultValue: [] })
    channelsOwn: number[];

    @Field(type => [Int], { nullable: true, defaultValue: [] })
    channelsParticipatingIn: number[];

    @Field(type => [Message], { nullable: true })
    messages?: Message[];
}
