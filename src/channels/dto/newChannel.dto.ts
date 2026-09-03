import { Field, InputType, Int } from '@nestjs/graphql';

@InputType('NewChannelInput')
export class NewChannel {
    @Field(type => Int)
    createdBy: number;
}
